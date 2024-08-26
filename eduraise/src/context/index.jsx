import React, { useContext, createContext } from "react";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { contractABI } from "../utils/contractABI";
import { client } from "../client";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { toast } from "react-toastify";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
	const contract = getContract({
		client,
		chain: defineChain(656476),
		address: process.env.REACT_APP_CONTRACT_ID,
		abi: contractABI,
	});

	const activeAccount = useActiveAccount();
	const address = activeAccount?.address;
	const navigate = useNavigate();
	const { mutate: sendCreateCampaignTransaction } = useSendTransaction();
	const { mutate: sendDonationTransaction } = useSendTransaction();

	const getCampaigns = async (
		data,
		isFetchingCampaigns,
		fetchCampaignsError
	) => {
		if (!isFetchingCampaigns && data) {
			if (fetchCampaignsError) {
				toast.error(
					"Error fetching campaigns: " + fetchCampaignsError.message
				);
				return;
			}

			try {
				const parsedCampaigns = data[0].map((_, i) => ({
					owner: data[0][i],
					title: data[1][i],
					description: data[2][i],
					target: ethers.utils.formatEther(data[3][i].toString()),
					deadline: Number(data[4][i]),
					amountCollected: ethers.utils.formatEther(
						data[5][i].toString()
					),
					image: data[6][i],
					pId: i,
				}));
				return parsedCampaigns;
			} catch (error) {
				toast.error("Failed to parse campaigns ! " + error.message);
				return;
			}
		}
	};

	const publishCampaign = async (form) => {
		try {
			const transaction = prepareContractCall({
				contract,
				method: "function createCampaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image) returns (uint256)",
				params: [
					address,
					form.title,
					form.description,
					form.target,
					new Date(form.deadline).getTime(),
					form.image,
				],
			});
			sendCreateCampaignTransaction(transaction);
			setTimeout(() => {
				navigate("/profile");
			}, 10000);
		} catch (error) {
			toast.error(
				"Gets Error while creating the campaign, pls try again."
			);
			window.location.reload(true);
		}
	};

	const getUserCampaigns = async (data) => {
		const filteredCampaigns = data.filter(
			(campaign) => campaign.owner === address
		);

		return filteredCampaigns;
	};

	const donate = async (pId, amount, address, owner) => {
		if (address === owner) {
			toast.warning("You can't donate to your own campaign !");
			await new Promise((resolve) => setTimeout(resolve, 6000));
			navigate("/");
		} else {
			if (amount < 0) {
				toast.warning("Please correct the amount !");
				await new Promise((resolve) => setTimeout(resolve, 6000));
				window.location.reload(false);
			}
			const transaction = prepareContractCall({
				contract,
				method: "function donateToCampaign(uint256 _id) payable",
				params: [pId],
				value: ethers.utils.parseEther(amount), // Wei to Eth
			});
			sendDonationTransaction(transaction);
			return transaction;
		}
	};

	const getDonations = async (donations) => {
		const numberOfDonations = donations[0].length;
		const parsedDonations = [];

		for (let donor = 0; donor < numberOfDonations; donor++) {
			parsedDonations.push({
				donator: donations[0][donor],
				donation: ethers.utils.formatEther(
					donations[1][donor].toString()
				),
			});
		}
		return parsedDonations;
	};

	return (
		<StateContext.Provider
			value={{
				contract,
				address,
				createCampaign: publishCampaign,
				getCampaigns,
				getUserCampaigns,
				donate,
				getDonations,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DisplayCampaigns } from "../components";
import { useStateContext } from "../context";
import { useReadContract } from "thirdweb/react";

const Profile = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [campaigns, setCampaigns] = useState([]);

	const { contract, getCampaigns, getUserCampaigns } = useStateContext();

	const {
		data: allCampaignsData,
		isLoading: isFetchingCampaigns,
		error: fetchCampaignsError,
	} = useReadContract({
		contract,
		method: "function getAllCampaigns() view returns (address[] owners, string[] titles, string[] descriptions, uint256[] targets, uint256[] deadlines, uint256[] amountCollecteds, string[] images)",
		params: [],
	});

	useEffect(() => {
		if (!isFetchingCampaigns && contract) {
			fetchCampaigns();
		}
	}, [isFetchingCampaigns, contract]);

	const fetchCampaigns = async () => {
		if (getUserCampaigns) {
			setIsLoading(true);
			try {
				const data = await getCampaigns(
					allCampaignsData,
					isFetchingCampaigns,
					fetchCampaignsError
				);
				const userCampaign = await getUserCampaigns(data);
				setCampaigns(userCampaign);
			} catch (error) {
				toast.error("Failed to fetch campaigns: " + error.message);
			} finally {
				setIsLoading(false);
			}
		} else {
			toast.error("Get campaigns function is not available.");
		}
	};

	return (
		<DisplayCampaigns
			title="Your Campaigns"
			isLoading={isLoading}
			campaigns={campaigns}
		/>
	);
};

export default Profile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { money } from "../assets";
import { FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { toast } from "react-toastify";
import { TransactionButton, useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";

const CreateCampaign = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { address, contract } = useStateContext();
	const { mutate: sendCreateCampaignTransaction } = useSendTransaction({
		payModal: false,
	});
	const [form, setForm] = useState({
		name: "",
		title: "",
		description: "",
		target: "",
		deadline: "",
		image: "",
	});

	const handleFormFieldChange = (fieldName, e) => {
		setForm({ ...form, [fieldName]: e.target.value });
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		// Get the current time and add one day (in milliseconds)
		const now = new Date();
		const nowTimestamp = now.getTime();
		const oneDayLaterTimestamp = nowTimestamp + 24 * 60 * 60 * 1000;

		const deadlineDate = new Date(form.deadline);
		const deadlineTimestamp = deadlineDate.getTime();

		checkIfImage(form.image, async (exists) => {
			if (exists) {
				if (deadlineTimestamp > oneDayLaterTimestamp) {
					const transaction = prepareContractCall({
						contract,
						method: "function createCampaign(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image) returns (uint256)",
						params: [
							address,
							form.title,
							form.description,
							ethers.utils.parseUnits(form.target, 18),
							new Date(form.deadline).getTime(),
							form.image,
						],
					});
					sendCreateCampaignTransaction(transaction);
				} else {
					toast.warning(
						"Please enter a valid deadline, deadline must be at least 24 hours from now !"
					);
					setForm({ ...form, deadline: "" });
					setIsLoading(false);
				}
			} else {
				toast.warning("Please provide a valid image URL !");
				setForm({ ...form, image: "" });
			}
		});
	};

	return (
		<div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
			{isLoading && <Loader title="Creating Campaign" />}
			<div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
				<h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
					Start a Campaign
				</h1>
			</div>
			<div className="w-full mt-[65px] flex flex-col gap-[30px]">
				<div className="flex flex-wrap gap-[40px]">
					<FormField
						labelName="Your Name *"
						placeholder="John Doe"
						inputType="text"
						value={form.name}
						handleChange={(e) => handleFormFieldChange("name", e)}
					/>
					<FormField
						labelName="Campaign Title *"
						placeholder="Write a title"
						inputType="text"
						value={form.title}
						handleChange={(e) => handleFormFieldChange("title", e)}
					/>
				</div>

				<FormField
					labelName="Description *"
					placeholder="Write your story and requirements..."
					isTextArea
					value={form.description}
					handleChange={(e) =>
						handleFormFieldChange("description", e)
					}
				/>
				<div className="flex flex-wrap gap-[40px]">
					<FormField
						labelName="Goal amount *"
						placeholder="1.00"
						inputType="text"
						value={form.target}
						handleChange={(e) => handleFormFieldChange("target", e)}
					/>
					<FormField
						labelName="End Date *"
						placeholder="End Date"
						inputType="date"
						value={form.deadline}
						handleChange={(e) =>
							handleFormFieldChange("deadline", e)
						}
					/>
				</div>

				<FormField
					labelName="Campaign image *"
					placeholder="Place image URL of your campaign"
					inputType="url"
					value={form.image}
					handleChange={(e) => handleFormFieldChange("image", e)}
				/>

				<div className="flex justify-center items-center mt-[40px]">
					<TransactionButton
						transaction={() => {
							handleSubmit();
						}}
						onTransactionConfirmed={(receipt) => {
							toast.success(
								"You have successfully created the campaign!",
								receipt.transactionHash
							);
							navigate("/profile");
							setIsLoading(false);
						}}
						onTransactionSent={(result) => {
							toast.success(
								"Transaction submitted, please wait for confirmation",
								result.transactionHash
							);
						}}
						onError={(e) => {
							toast.warning(
								"Thirdweb caused error, transaction confirmation windows will open soon."
							);
							setTimeout(() => {
								setIsLoading(false);
								navigate("/profile");
							}, 20000);
						}}
						unstyled
						className="bg-[#09d3ac] font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]"
					>
						Submit new campaign
					</TransactionButton>
				</div>
				<div className="w-full flex justify-center items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[12px] mt-[16px]">
					<img
						src={money}
						alt="money"
						className="w-[40px] h-[40px] object-contain"
					/>
					<h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
						You will get 100% of the raised amount
					</h4>
				</div>
			</div>
		</div>
	);
};

export default CreateCampaign;

export const contractABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "ContractMetadataUnauthorized",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "max",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "actual",
				type: "uint256",
			},
		],
		name: "PlatformFeeExceededMaxFeeBps",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "recipient",
				type: "address",
			},
		],
		name: "PlatformFeeInvalidRecipient",
		type: "error",
	},
	{
		inputs: [],
		name: "PlatformFeeUnauthorized",
		type: "error",
	},
	{
		inputs: [],
		name: "ReentrancyGuardReentrantCall",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "campaignId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "title",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "target",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "deadline",
				type: "uint256",
			},
		],
		name: "CampaignCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "string",
				name: "prevURI",
				type: "string",
			},
			{
				indexed: false,
				internalType: "string",
				name: "newURI",
				type: "string",
			},
		],
		name: "ContractURIUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "campaignId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "donator",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "rewardTier",
				type: "uint256",
			},
		],
		name: "DonationReceived",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "platformFeeRecipient",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "flatFee",
				type: "uint256",
			},
		],
		name: "FlatPlatformFeeUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "platformFeeRecipient",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "platformFeeBps",
				type: "uint256",
			},
		],
		name: "PlatformFeeInfoUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "enum IPlatformFee.PlatformFeeType",
				name: "feeType",
				type: "uint8",
			},
		],
		name: "PlatformFeeTypeUpdated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "campaignId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "title",
				type: "string",
			},
			{
				indexed: false,
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "image",
				type: "string",
			},
			{
				indexed: false,
				internalType: "string",
				name: "tier",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "estimatedDeliveryTime",
				type: "uint256",
			},
		],
		name: "RewardSet",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "campaignId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "title",
				type: "string",
			},
			{
				indexed: false,
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "image",
				type: "string",
			},
			{
				indexed: false,
				internalType: "string",
				name: "tier",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "estimatedDeliveryTime",
				type: "uint256",
			},
		],
		name: "RewardUpdated",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "campaigns",
		outputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				internalType: "string",
				name: "title",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "target",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "amountCollected",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "image",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "contractURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_owner",
				type: "address",
			},
			{
				internalType: "string",
				name: "_title",
				type: "string",
			},
			{
				internalType: "string",
				name: "_description",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "_target",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_deadline",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "_image",
				type: "string",
			},
		],
		name: "createCampaign",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "deployer",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
		],
		name: "donateToCampaign",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "getAllCampaigns",
		outputs: [
			{
				internalType: "address[]",
				name: "owners",
				type: "address[]",
			},
			{
				internalType: "string[]",
				name: "titles",
				type: "string[]",
			},
			{
				internalType: "string[]",
				name: "descriptions",
				type: "string[]",
			},
			{
				internalType: "uint256[]",
				name: "targets",
				type: "uint256[]",
			},
			{
				internalType: "uint256[]",
				name: "deadlines",
				type: "uint256[]",
			},
			{
				internalType: "uint256[]",
				name: "amountCollecteds",
				type: "uint256[]",
			},
			{
				internalType: "string[]",
				name: "images",
				type: "string[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
		],
		name: "getAllRewards",
		outputs: [
			{
				internalType: "string[]",
				name: "titles",
				type: "string[]",
			},
			{
				internalType: "string[]",
				name: "descriptions",
				type: "string[]",
			},
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]",
			},
			{
				internalType: "string[]",
				name: "images",
				type: "string[]",
			},
			{
				internalType: "string[]",
				name: "tiers",
				type: "string[]",
			},
			{
				internalType: "uint256[]",
				name: "estimatedDeliveryTimes",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
		],
		name: "getCampaignSummary",
		outputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				internalType: "string",
				name: "title",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "target",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "amountCollected",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "image",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
		],
		name: "getDonators",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getFlatPlatformFeeInfo",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getPlatformFeeInfo",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getPlatformFeeType",
		outputs: [
			{
				internalType: "enum IPlatformFee.PlatformFeeType",
				name: "",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_index",
				type: "uint256",
			},
		],
		name: "getReward",
		outputs: [
			{
				internalType: "string",
				name: "title",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "image",
				type: "string",
			},
			{
				internalType: "string",
				name: "tier",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "estimatedDeliveryTime",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "numberOfCampaigns",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_uri",
				type: "string",
			},
		],
		name: "setContractURI",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_platformFeeRecipient",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_flatFee",
				type: "uint256",
			},
		],
		name: "setFlatPlatformFeeInfo",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_platformFeeRecipient",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_platformFeeBps",
				type: "uint256",
			},
		],
		name: "setPlatformFeeInfo",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "enum IPlatformFee.PlatformFeeType",
				name: "_feeType",
				type: "uint8",
			},
		],
		name: "setPlatformFeeType",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
			{
				internalType: "string[3]",
				name: "_titles",
				type: "string[3]",
			},
			{
				internalType: "string[3]",
				name: "_descriptions",
				type: "string[3]",
			},
			{
				internalType: "uint256[3]",
				name: "_amounts",
				type: "uint256[3]",
			},
			{
				internalType: "string[3]",
				name: "_images",
				type: "string[3]",
			},
			{
				internalType: "uint256[3]",
				name: "_estimatedDeliveryTimes",
				type: "uint256[3]",
			},
		],
		name: "setRewards",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_index",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "_title",
				type: "string",
			},
			{
				internalType: "string",
				name: "_description",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "_image",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "_estimatedDeliveryTime",
				type: "uint256",
			},
		],
		name: "updateReward",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

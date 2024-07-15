// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Campaign is ReentrancyGuard {
    struct Reward {
        string title;
        string description;
        uint256 amount;
        string image;
        string tier;
        uint256 estimatedDeliveryTime;
    }

    struct CampaignStruct {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        Reward[] rewards;
    }

    mapping(uint256 => CampaignStruct) public campaigns;
    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(uint256 campaignId, address owner, string title, uint256 target, uint256 deadline);
    event DonationReceived(uint256 campaignId, address donator, uint256 amount, uint256 rewardTier);
    event RewardSet(uint256 campaignId, uint256 index, string title, string description, uint256 amount, string image, string tier, uint256 estimatedDeliveryTime);
    event RewardUpdated(uint256 campaignId, uint256 index, string title, string description, uint256 amount, string image, string tier, uint256 estimatedDeliveryTime);

    modifier campaignExists(uint256 _id) {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        _;
    }

    modifier onlyOwner(uint256 _id) {
        require(msg.sender == campaigns[_id].owner, "Only the campaign owner can perform this action.");
        _;
    }

    modifier beforeDeadline(uint256 _id) {
        require(block.timestamp < campaigns[_id].deadline, "Cannot perform this action after the campaign deadline.");
        _;
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");
        require(_target > 0, "The target should be greater than 0.");

        CampaignStruct storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        emit CampaignCreated(numberOfCampaigns - 1, _owner, _title, _target, _deadline);

        return numberOfCampaigns - 1;
    }

    function setRewards(
        uint256 _id,
        string[3] memory _titles,
        string[3] memory _descriptions,
        uint256[3] memory _amounts,
        string[3] memory _images,
        uint256[3] memory _estimatedDeliveryTimes
    ) public campaignExists(_id) onlyOwner(_id) beforeDeadline(_id) {
        require(bytes(_titles[0]).length > 0, "The first reward must have a title.");
        require(_amounts[0] > 0, "The amount of the first reward must be greater than 0.");
        CampaignStruct storage campaign = campaigns[_id];

        for (uint256 i = 0; i < 3; i++) {
            if (bytes(_titles[i]).length > 0) {
                string memory tier;
                if (i == 0) {
                    tier = "A";
                } else if (i == 1) {
                    tier = "B";
                } else {
                    tier = "C";
                }
                Reward memory reward = Reward({
                    title: _titles[i],
                    description: _descriptions[i],
                    amount: _amounts[i],
                    image: _images[i],
                    tier: tier,
                    estimatedDeliveryTime: _estimatedDeliveryTimes[i]
                });
                campaign.rewards.push(reward);
                emit RewardSet(_id, campaign.rewards.length - 1, _titles[i], _descriptions[i], _amounts[i], _images[i], tier, _estimatedDeliveryTimes[i]);
            }
        }
    }

    function updateReward(
        uint256 _id,
        uint256 _index,
        string memory _title,
        string memory _description,
        uint256 _amount,
        string memory _image,
        uint256 _estimatedDeliveryTime
    ) public campaignExists(_id) onlyOwner(_id) beforeDeadline(_id) {
        require(_index < campaigns[_id].rewards.length, "Invalid reward index.");
        CampaignStruct storage campaign = campaigns[_id];
        string memory tier = campaign.rewards[_index].tier;

        campaign.rewards[_index] = Reward({
            title: _title,
            description: _description,
            amount: _amount,
            image: _image,
            tier: tier,
            estimatedDeliveryTime: _estimatedDeliveryTime
        });

        emit RewardUpdated(_id, _index, _title, _description, _amount, _image, tier, _estimatedDeliveryTime);
    }

    function donateToCampaign(uint256 _id) public payable nonReentrant campaignExists(_id) beforeDeadline(_id) {
        require(msg.value > 0, "Donation amount must be greater than 0.");

        CampaignStruct storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;

        uint256 rewardTier = 0;
        for (uint256 i = 0; i < campaign.rewards.length; i++) {
            if (msg.value >= campaign.rewards[i].amount) {
                rewardTier = i + 1;
            }
        }

        (bool sent, ) = payable(campaign.owner).call{value: msg.value}("");
        require(sent, "Failed to send donation to the campaign owner.");

        emit DonationReceived(_id, msg.sender, msg.value, rewardTier);
    }

    function getReward(uint256 _id, uint256 _index) public view campaignExists(_id) returns (
        string memory title, 
        string memory description, 
        uint256 amount, 
        string memory image, 
        string memory tier,
        uint256 estimatedDeliveryTime
    ) {
        require(_index < campaigns[_id].rewards.length, "Invalid reward index.");
        CampaignStruct storage campaign = campaigns[_id];
        Reward storage reward = campaign.rewards[_index];
        return (reward.title, reward.description, reward.amount, reward.image, reward.tier, reward.estimatedDeliveryTime);
    }

    function getAllRewards(uint256 _id) public view campaignExists(_id) returns (
        string[] memory titles, 
        string[] memory descriptions, 
        uint256[] memory amounts, 
        string[] memory images, 
        string[] memory tiers, 
        uint256[] memory estimatedDeliveryTimes
    ) {
        CampaignStruct storage campaign = campaigns[_id];
        uint256 rewardsLength = campaign.rewards.length;

        titles = new string[](rewardsLength);
        descriptions = new string[](rewardsLength);
        amounts = new uint256[](rewardsLength);
        images = new string[](rewardsLength);
        tiers = new string[](rewardsLength);
        estimatedDeliveryTimes = new uint256[](rewardsLength);

        for (uint256 i = 0; i < rewardsLength; i++) {
            Reward storage reward = campaign.rewards[i];
            titles[i] = reward.title;
            descriptions[i] = reward.description;
            amounts[i] = reward.amount;
            images[i] = reward.image;
            tiers[i] = reward.tier;
            estimatedDeliveryTimes[i] = reward.estimatedDeliveryTime;
        }

        return (titles, descriptions, amounts, images, tiers, estimatedDeliveryTimes);
    }

    function getCampaignSummary(uint256 _id) 
        public view campaignExists(_id) returns (
        address owner, 
        string memory title, 
        string memory description, 
        uint256 target, 
        uint256 deadline, 
        uint256 amountCollected, 
        string memory image
    ) {
        CampaignStruct storage campaign = campaigns[_id];
        return (
            campaign.owner,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.image
        );
    }

    function getDonators(uint256 _id) public view campaignExists(_id) returns (address[] memory, uint256[] memory) {
        CampaignStruct storage campaign = campaigns[_id];
        return (campaign.donators, campaign.donations);
    }

    function getAllCampaigns() public view returns (
        address[] memory owners, 
        string[] memory titles, 
        string[] memory descriptions, 
        uint256[] memory targets, 
        uint256[] memory deadlines, 
        uint256[] memory amountCollecteds, 
        string[] memory images
    ) {
        owners = new address[](numberOfCampaigns);
        titles = new string[](numberOfCampaigns);
        descriptions = new string[](numberOfCampaigns);
        targets = new uint256[](numberOfCampaigns);
        deadlines = new uint256[](numberOfCampaigns);
        amountCollecteds = new uint256[](numberOfCampaigns);
        images = new string[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            CampaignStruct storage campaign = campaigns[i];
            owners[i] = campaign.owner;
            titles[i] = campaign.title;
            descriptions[i] = campaign.description;
            targets[i] = campaign.target;
            deadlines[i] = campaign.deadline;
            amountCollecteds[i] = campaign.amountCollected;
            images[i] = campaign.image;
        }

        return (owners, titles, descriptions, targets, deadlines, amountCollecteds, images);
    }
}

import {
  createCampaign,
  dashboard,
  profile_2,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    label: "All Campaigns",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    label: "Create Campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "profile",
    label: "Profile",
    imgUrl: profile_2,
    link: "/profile",
  },
];

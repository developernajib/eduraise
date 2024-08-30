import {
  createCampaign,
  dashboard,
  profile_2,
} from "../assets";

export const navlinks = [
  {
    name: "Dashboard",
    label: "All Campaigns",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "Create Campaign",
    label: "Create Campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "Profile",
    label: "Profile",
    imgUrl: profile_2,
    link: "/profile",
  },
];

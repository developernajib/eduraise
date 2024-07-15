require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      }
    ]
  },
  paths: {
    artifacts: "./src",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  networks: {
    opencampus: {
      url: `https://rpc.opencampus.gelato.digital`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      opencampus: process.env.ETHER_SCAN_API_KEY,
    },
    customChains: [
      {
        network: "opencampus",
        chainId: 656476,
        urls: {
          apiURL: "https://opencampus.gelatoscout.com/api",
          browserURL: "https://opencampus.gelatoscout.com",
        },
      },
    ],
  },
};

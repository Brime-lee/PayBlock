require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: '0.8.9',
  paths: {
    artifacts: './frontend/src/artifacts',
  },
  networks: {
    polygon_mumbai: {
      url: process.env.MUMBAI_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

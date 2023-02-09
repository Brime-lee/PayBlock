const { ethers } = require("hardhat");


async function main() {
  const payrollSC = await ethers.getContractFactory("SalaryPayment");
  const payrollSCDeployment = await payrollSC.deploy();
  await payrollSCDeployment.deployed();

  console.log("Your smart contract is deployed at", payrollSCDeployment.address);
}

main()
  .then(()=> process.exit(0))
  .catch((error) =>{
    console.error(error);
    process.exitCode= 1;
  });

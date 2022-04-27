// Script used for deploying contract

const main = async () => {
  
  const Tranactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Tranactions.deploy();  //creating insatnce of contarct

  await transactions.deployed();

  console.log("Transactions deployed to: ", transactions.address);
}


const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch(error) {
      console.log(error);
      process.exit(1);
    }
}


runMain();


const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
  //HTTP://127.0.0.1:7545
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  //creating a wallet with the private key from ganache
  const wallet = new ethers.Wallet(
    "0x49988d1e57636550d841b8297bdbfa3bac2b7a2fba38111defa57ec2adc74e73",
    provider
  );
  //fetch abi
  const abi = fs.readFileSync(
    "./SimpleContract_sol_SimpleContract.abi",
    "utf8"
  );
  //fetch binary
  const binary = fs.readFileSync(
    "./SimpleContract_sol_SimpleContract.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait....");
  const contract = await contractFactory.deploy();
  //use the methods in the contracts
  //get favourite
  const favNo = await contract.retrieve();
  console.log("current favourite no >>>", favNo.toString());
  //set favourite
  const txResponse = await contract.store("7");
  await txResponse.wait(1);
  const updatedFavNo = await contract.retrieve();
  console.log("updated favourite no >>>", updatedFavNo.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Error >>>", error);
    process.exit(1);
  });

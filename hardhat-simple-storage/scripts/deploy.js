//imports
const {ethers, run, network} = require("hardhat");


//async main
async function main() {
  const simpleContractFactory = await ethers.getContractFactory("SimpleContract");     
  console.log("Deploying Contract ....");
  const simpleStorage = await simpleContractFactory.deploy();
  const _address = await simpleStorage.getAddress();
  console.log(`Deployed contract to: ${_address}`);
  console.log(network.config);
  //should only be in testnet or mainnet
  await simpleStorage.deploymentTransaction().wait(6);
  await verify(_address, []);
  //interact with contract
  const currentValue = await simpleStorage.retrieve();
  console.log('Current value: ', currentValue.toString());
  //update the current value
  const txnResponse = await simpleStorage.store(7);
  await txnResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log('Updated Value: ', updatedValue.toString());
}

async function verify(contractAddress, args) {
  console.log("Verifying contract ....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      contructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes('already verified')){
      console.log('Already verified');
    }else{
      console.log(error);
    }
  }

}

//main
main()
  .then(() => process.exit(0))
  .catch((error) => process.exit(1));

This folder contains the code for the first part of the complete solidity roadmap.
In this series, we will be building a simple smart contract that allows us to store a string on the blockchain.
We're using [Crypto Zombies](https://cryptozombies.io/) as the learning platform and completing the Solidity basics series.

## Part 0: Solidity smart contracts

here we are practicing to build smart contracts and learing solidity basics, at first we will go through some solidity basics and than move on to building a fullstack application integrated with solidity smart contract.
We have created a new folder in which we will learn how to deploy the contract to the blockchain, we will learn how to compile the contract to get the binaries and use this command to compile ``` yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleContract.sol ``` 
use of ```ethers``` and ```ganache``` for local development.
learned about ganache and deployed a contract in ganache local dev blockchain.
added environment variables for rpc urls and private keys.
verified and publish code after deploying the contract to sepolia test net from vscode and with the help of alchamy.
We are using hardhat for boilerplate and connection with hardhat's ethers module and replacing ganache.
Added the testing liberary Mocha and installed gas-reporter and solidity coverage for good dev experience and avoid security flaws in a smart contract.
Added a typescript hardhat project

## Part 1: Solidity Basics

Here we go through [Module 1](https://cryptozombies.io/en/lesson/1/chapter/1) of the Crypto zombies course

## Part 2: Solidity Medium

Here we go through [Module 2](https://cryptozombies.io/en/lesson/1/chapter/2) of the Crypto zombies course

## Part 3: Advanced solidity concepts

Here we go through [Module 3](https://cryptozombies.io/en/lesson/1/chapter/3) of the Crypto zombies course

## Part 4: Payments in Solidity

Here we go through [Module 4](https://cryptozombies.io/en/lesson/1/chapter/4) of the Crypto zombies course

## Part 5: Building our own contract

Here we build our own Solidity contract to accept payments from a user. The project contains

- A simple contract that accepts payments. It emits events anytime a user makes a payment
- A frontend where a user can go, connect their wallet and make a payment. Once the payment is made, the user is given access to the course
- A centralized backend that watches the contract, and anytime a payment is made, it gives the user access to the course

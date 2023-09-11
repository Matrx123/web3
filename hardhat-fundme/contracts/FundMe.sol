// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./PriceConverter.sol";

//error codes
error FundMe__NotOwner();

/**
 * @title FundMe contract
 * @author Vipin Joshi
 * @notice This is a simple contract to test the fund transfer
 */
contract FundMe {
    using PriceConverter for uint256;

    uint256 public minimumUsd = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmount;
    //aggregator address variable
    AggregatorV3Interface public priceFeed;
    address public owner;

    /**
     * Only owner modifier to check if owner else throw error
     */
    modifier onlyOwner() {
        if (msg.sender != owner) revert FundMe__NotOwner();
        _;
    }

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /**
     * @notice this function send funds
     * @dev this is create a list of funders and their contributions
     */
    function fund() public payable {
        require(
            msg.value.getConversionRate(priceFeed) >= minimumUsd,
            "You need to spend more ETH!"
        );
        funders.push(msg.sender);
        addressToAmount[msg.sender] = msg.value;
    }

    function withdraw() public payable onlyOwner {
        for (uint256 i = 0; i < funders.length; i++) {
            addressToAmount[funders[i]] = 0;
        }
        //reset the array
        funders = new address[](0);
        //withdraw
        //transfer
        // payable(msg.sender).transfer(address(this).balance);
        //send
        //(bool sendSuccess, ) = payable(msg.sender).send(address(this).balance);
        //require(sendSuccess, "Send Failed");
        //call
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Transfer Failed");
    }
}

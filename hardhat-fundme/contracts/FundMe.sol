// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;

    uint256 public minimumUsd = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmount;
    //aggregator address variable
    AggregatorV3Interface public priceFeed;
    address public owner;

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate(priceFeed) >= minimumUsd,
            "Didn't send enough!"
        );
        funders.push(msg.sender);
        addressToAmount[msg.sender] = msg.value;
    }

    function withdraw() public {
        // for (uint256 i = 0; i < funders.length; i++) {
        //     addressToAmount[funders[i]] = 0;
        // }
        // //reset the array
        // funders = new address[](0);
        // //withdraw
        // //transfer
        // payable(msg.sender).transfer(address(this).balance);
        // //send
        // (bool sendSuccess, ) = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send Failed");
        // //call
        // (bool callSuccess, ) = payable(msg.sender).call{
        //     value: address(this).balance
        // };
        // require(callSuccess, "Call Failed");
    }
}

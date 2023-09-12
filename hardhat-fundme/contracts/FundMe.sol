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

    address[] public s_funders;
    mapping(address => uint256) public s_addressToAmount;
    //aggregator address variable
    AggregatorV3Interface public s_priceFeed;
    address public immutable i_owner;

    /**
     * Only owner modifier to check if owner else throw error
     */
    modifier onlyOwner() {
        if (msg.sender != i_owner) revert FundMe__NotOwner();
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /**
     * @notice this function send funds
     * @dev this is create a list of funders and their contributions
     */
    function fund() public payable {
        uint256 minimumUsd = 50 * 1e18;
        require(
            msg.value.getConversionRate(s_priceFeed) >= minimumUsd,
            "You need to spend more ETH!"
        );
        s_funders.push(msg.sender);
        s_addressToAmount[msg.sender] = msg.value;
    }

    function withdraw() public payable onlyOwner {
        for (uint256 i = 0; i < s_funders.length; i++) {
            s_addressToAmount[s_funders[i]] = 0;
        }
        //reset the array
        s_funders = new address[](0);
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

    function cheaperWithdraw() public payable onlyOwner {
        address[] memory funders = s_funders;
        for (uint256 i = 0; i < funders.length; i++) {
            s_addressToAmount[funders[i]] = 0;
        }
        s_funders = new address[](0);
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "Cheap Transfer failed");
    }
}

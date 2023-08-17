//SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.0;

import "./SimpleContract.sol";

contract ExtraContract is SimpleContract {

    function store(uint256 _no) public override  {
        favouriteNo = _no + 5;
    }
}

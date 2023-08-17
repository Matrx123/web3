//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleContract.sol";

contract StorageFactory {
    SimpleContract[] public simpleContractArray;

    function deploySimpleContract() public {
        SimpleContract simpleContract = new SimpleContract();
        simpleContractArray.push(simpleContract);
    }

    function storePeople(string memory _name, uint256 _index, uint256 _no) public {
        simpleContractArray[_index].addPeople(_name, _no);
    }

    function seeContractItems(uint256 _index) public view returns(string memory name, uint256 no) {
         return (simpleContractArray[_index].getPerson(_index).name, simpleContractArray[_index].getPerson(_index).no);
    }
}

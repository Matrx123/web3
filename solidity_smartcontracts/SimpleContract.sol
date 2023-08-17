//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleContract {
    uint256 favouriteNo;
    mapping(string => uint256) public nameToFavNo;
    People[] public peoples;

    struct People {
        string name;
        uint256 no;
    }

    function store(uint256 _no) public virtual  {
        favouriteNo = _no;
    }

    function addPeople(string memory _name, uint256 _no) public {
        peoples.push(People(_name, _no));
    }
    
    function makeMapping(string memory _name, uint256 _no) public {
        nameToFavNo[_name] = _no;
    }

    function getPerson(uint256 _index) public view returns(People memory) {
        return peoples[_index];
    }
}

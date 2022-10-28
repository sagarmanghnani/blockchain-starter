// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint public myFavoriteNumber;

    function retrieve() public view returns(uint) {
        return myFavoriteNumber;
    }

    function store(uint _favoriteNumber) public {
        myFavoriteNumber = _favoriteNumber;
    }
}
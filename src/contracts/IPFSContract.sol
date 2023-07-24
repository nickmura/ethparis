//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error InvalidIdentifier(uint256 identifier);
contract DeployData {

    mapping(uint256=>string)data;


    constructor(string memory name, uint256 num) {
        storeData(name, num);
    }


    function storeData(string memory _name, uint256 _identifier) public {
        if (bytes(data[_identifier]).length != 0) {
            revert InvalidIdentifier({
            identifier:_identifier
            });
        }
        data[_identifier] = _name;
    }

    function readData(uint256 _identifier) public view returns (string memory) {
        if (bytes(data[_identifier]).length == 0) {
            revert InvalidIdentifier({
                identifier:_identifier
            });
        } else {
            return data[_identifier];
        }
    }
}
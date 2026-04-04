// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BlobStorage {
    // Owner of the contract
    address public owner;

    // Storage for the blob
    bytes private blob;

    // Constructor sets the deployer as the owner
    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict functions to owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Set or replace the blob (owner only)
    function setBytes(bytes calldata data) external onlyOwner {
        blob = data;
    }

    // Get the blob
    function getBytes() external view returns (bytes memory) {
        return blob;
    }

    // Get the size of the blob
    function getSize() external view returns (uint256) {
        return blob.length;
    }
}

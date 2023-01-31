// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract Exchange {

    //MARK: - Properties
	address public feeAccount;
    uint256 public feePercent;

    //MARK: - Constructor
    constructor(address _feeAccount, uint256 _feePercent) {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    //MARK: - Public functions
    

    //MARK: - Internal functions
    

}

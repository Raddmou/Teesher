//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


//import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//learn more: https://docs.openzeppelin.com/contracts/3.x/erc721

// GET LISTED ON OPENSEA: https://testnets.opensea.io/get-listed/step-two

contract TeeshCollection is ERC1155, Ownable {
  uint64 public cost = 0.10 ether;
  uint256 public tokenSupply;
  uint256 public maxSupply = 100;

  constructor(string memory _uri) ERC1155(_uri) 
  {}

  function mint(
      address _to,
		  uint256 _quantity,
		  bytes memory _data
  )
      public
      onlyOwner
  {
        require(tokenSupply + _quantity < maxSupply - 1, "Max supply error");

        _mint(_to, 0, _quantity, _data);
        tokenSupply = tokenSupply + _quantity;
  }

    function safeTransferFrom(
        address from,
        address to,
        uint256 amount,
        bytes memory data
    ) public {
        super.safeTransferFrom(from, to, 0, amount, data);
    }
}
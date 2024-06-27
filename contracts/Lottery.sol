// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function random() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(block.prevrandao, block.timestamp, players)
                )
            );
    }

    function pickWinner() public restricted {
        require(players.length > 0, "No players in the game");
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }


    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}

pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract ToDo {
    struct Task {
        string text;
        bool done;
    }

    mapping(address => Task[]) addressToTasks;

    function newTask(string memory text) public returns (uint taskID) {
        addressToTasks[msg.sender].push(Task(text, false));
    }

    function done(uint index) public {
        Task storage t = addressToTasks[msg.sender][index];
        t.done = true;
    }

    function getNumberOfTasks() public view returns (uint length) {
        return addressToTasks[msg.sender].length;
    }

    function getByIndex(uint index) public view returns (string memory text, bool done) {
        Task memory t = addressToTasks[msg.sender][index];
        return (t.text, t.done);
    }
}
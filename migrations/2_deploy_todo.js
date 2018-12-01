var ToDo = artifacts.require("./todo.sol");

module.exports = function(deployer) {
    deployer.deploy(ToDo);
};
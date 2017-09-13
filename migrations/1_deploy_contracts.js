var MarketPrice = artifacts.require("./MarketPrice.sol");
var Example = artifacts.require("./Example.sol");

module.exports = function(deployer) {
  deployer.deploy(MarketPrice);
  deployer.deploy(Example);
};

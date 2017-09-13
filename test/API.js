var MarketPrice = artifacts.require("./MarketPrice.sol");
var Example = artifacts.require("./Example.sol");

  var account_one;
  var account_two;
  var account_three;
  var priceAddress;
  var meta;
  var metaExample;
  var storjFiveBucks;

contract('MarketPrice', function(accounts) {

  account_one = accounts[0];
  account_two = accounts[1];
  account_three = accounts[2];

  it("should insert new ETH price", function() {
    return MarketPrice.deployed().then(function(instance) {
      meta = instance;
      priceAddress = instance.address;
      return meta.update(0, "ETH", 1000000000000000000, 33652131190000, 40154176530000, 44664290720000, {from: account_one});
    });
  });


  it("should insert new OMG price", function() {
    return MarketPrice.deployed().then(function(instance) {
      meta = instance;
      return meta.update(1, "OMG", 39051897400000000, 34586757420000, 41366227000000, 45945555490000, {from: account_one});
    });
  });


  it("should insert new STORJ price", function() {
    return MarketPrice.deployed().then(function(instance) {
      meta = instance;
      return meta.update(2, "STORJ", 1835596500000000, 34672380679999, 41468633560000, 46059298670000, {from: account_one});
    });
  });


  it("should get 0.01 USD worth of ETH", function() {
    return MarketPrice.deployed().then(function(instance) {
      return instance.USD(0);
    }).then(function(amount) {
      assert.equal(amount, 33652131190000, "Ethereum EURO Price was set correctly");
    });
  });


  it("should get 0.01 EURO worth of ETH", function() {
    return MarketPrice.deployed().then(function(instance) {
      return meta.EUR(0);
    }).then(function(amount) {
      assert.equal(amount, 40154176530000, "Ethereum EURO Price was set correctly");
    });
  });


  it("should get 0.01 GBP worth of ETH", function() {
    return MarketPrice.deployed().then(function(instance) {
      return meta.GBP(0);
    }).then(function(amount) {
      assert.equal(amount, 44664290720000, "Ethereum GBP Price was set correctly");
    });
  });


  it("should get 0.01 USD worth of OMG", function() {
    return MarketPrice.deployed().then(function(instance) {
      return meta.USD(1);
    }).then(function(amount) {
      assert.equal(amount, 34586757420000, "OMG EURO Price was set correctly");
    });
  });


  it("should get $105.75 USD worth of ETH", function() {
    return MarketPrice.deployed().then(function(instance) {
      return meta.USD(0);
    }).then(function(amount) {
      var dollars = amount * 10575;
      assert.equal(dollars, 355871287334250000, "Ethereum USD conversion is correct");
    });
  });


  it("should get $100.00 USD worth of OMG", function() {
    return MarketPrice.deployed().then(function(instance) {
      return meta.USD(0);
    }).then(function(amount) {
      var dollars = amount * 10000;
      assert.equal(dollars, 336521311900000000, "OMG USD conversion is correct");
    });
  });


  it("should change Creator address", function() {
    return MarketPrice.deployed().then(function(instance) {
      return meta.changeCreator(account_three, {from: account_one});
    }).then(function() {
      return meta.creator.call();
    }).then(function(creator) {
      assert.equal(creator, account_three, "New Creator was set");
    });
  });


  it("should change Sender address", function() {
    return MarketPrice.deployed().then(function(instance) {
      return meta.changeSender(account_two, {from: account_three});
    }).then(function() {
      return meta.sender.call();
    }).then(function(sender) {
      assert.equal(sender, account_two, "New Sender was set");
    });
  });


    it("should be MarketPrice contract address", function() {
      return Example.deployed().then(function(instance) {
        return instance.PriceAddress.call()
      }).then(function(address) {
        assert.equal(address, priceAddress, "Example has MarketPrice contract correct");
      });
    });

    it("should test $5.00 worth of ETH", function() {
      return Example.deployed().then(function(instance) {
        return instance.FiveETHUSD.call()
      }).then(function(amount) {
        assert.equal(amount.toNumber(), 16826065595000000, "$5.00 USD worth of ETH is correct");
      });
    });

});

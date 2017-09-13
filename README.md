<p align="center">
  <img width="560" src="https://i.imgur.com/AGgUuW8.jpg"><br>
    <b>Coin Market Contract</b><br>
  <a href="https://ropsten.etherscan.io/address/0xc119e802e99c1f66dc78fd11f9d21773c9b053d4#code">Testnet</a> |
  <a href="https://etherscan.io/address/textmessage.eth#code">Mainnet</a> |
  <a href="#implementing-inside-contracts">Implement</a>
  <br>
  MarketPrice(<b>0x0E9E062D7e60C8a6A406488631DAE1c5f6dB0e7D</b>)
  <br>
  <br>
</p>

# Coin Market Price Smart Contract [![Build Status](https://travis-ci.org/hunterlong/marketprice.svg?branch=master)](https://travis-ci.org/hunterlong/marketprice)

Retrieve Ethereum market price by referencing this smart contract! 
Finally a way for smart contracts to get how much $1.00 is in ETH. 
By referencing this contracts you can even automatically convert 
other ERC20's market prices and convert it back into ETH.

This contract doesn't need any calls, all you need to do is reference it and start converting ETH to multiple crypto's. 
All return values are measure in Ethereum's WEI amount, the lowest possible value. You can convert USD, EUR, and even GBP.

```
price = MarketPrice(0xC119e802e99c1F66DC78fD11f9d21773C9b053D4) // TESTNET ADDRESS
```

## Market Rate inside Smart Contract
This contract holds multiple market rates for multiple cryptocurrencies, the contract automatically converts back into ETH value.

### Simple to Use Methods
```
uint256 coin = price.ETH(12);    // returns ETH value for 1 OMG.

uint256 cent = price.USD(12);    // returns $0.01 worth of OMG in USD.
uint256 cent = price.EUR(12);    // returns $0.01 worth of OMG in Euro.
uint256 cent = price.GBP(12);    // returns $0.01 worth of OMG in British Pound.
```

### Implement in your Contract
First you must include the Pricing Contract on the top of your contract.
```
contract Price {
    function ETH(uint _id) constant returns (uint256);
    function USD(uint _id) constant returns (uint256);
    function EUR(uint _id) constant returns (uint256);
    function GBP(uint _id) constant returns (uint256);
    function updatedAt(uint _id) constant returns (uint);
}

Price public price;

function Example() {
  price = Price(0x97d63Fe27cA359422C10b25206346B9e24A676Ca) // TESTNET ADDRESS
}

```
Here's an example of getting $5.00 USD worth of OMG coin valued as ETH. 

```
// $0.01 * 500 = $5.00
function FiveUSDtoOMG() constant returns (uint256) {
    uint256 omg = price.USD(12);
    return omg * 500;
}
```

### Get Market Price Changed Block
```
uint updatedBlock = price.updatedAt(12); // 4,109,482

if (block.number - updatedBlock > 100) {
  // the price hasn't been updated in 100 blocks.
}
```

Once you have the value of $5.00 worth of OMG in ETH, you can have a function to 
require the exact amount of ETH that is worth $5.00 of OMG. 
```
function TradeOMG() constant returns (uint256) {
    require(msg.value == FiveUSDtoOMG());
    // Awesome! The sender sent $5.00 worth of OMG based in ETH value (OMG/ETH)
}
```

# Supported Cryptos

- ETH - `price.ETH(0);` 
- BTC - `price.ETH(1);`
- BTC - `price.ETH(2);`
- BTC - `price.ETH(3);`
- BTC - `price.ETH(4);`
- BTC - `price.ETH(5);`
- BTC - `price.ETH(6);`
- BTC - `price.ETH(7);`

# Market Price Update Rate
Updating the contract requires the wallet to pay the Gas for the transaction.

# Donatation Based Update Timeline
This contract can accept donatation, the updater address can update market 
rates at a higher frequency if there was more community support.

Times a Day | Supported Coins | Supported Fiat | Each Cost | Daily Cost | Monthly Total
----------- | --------------- | -------------- | --------- | ---------- | --------------
1           |       5         |        3       | 63,000    |   315,000  |   9,450,000
24          |       5         |        3       | 63,000    | 1,512,000  |  45,300,000
48          |       5         |        3       | 63,000    | 3,024,000  |  90,720,000

# More Examples

```
uint256 weiAmount = (price.USD(0) * 450)       // $4.50 worth of ETH

uint256 weiAmount = (price.USD(9) * 723)       // $7.23 worth of STORJ

uint256 weiAmount = (price.USD(5) * 5793)      // $57.93 worth of LITECOIN

uint256 weiAmount = (price.USD(1) * 100000)    // $1,000 worth of BTC

uint256 weiAmount = (price.USD(0) * 10000)     // $1000 worth of ETH

uint256 weiAmount = (price.EUR(12) * 10000)    // 1000 EURO's worth of OMG
```

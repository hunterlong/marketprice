pragma solidity 0.4.15;

/*

    Crypto Price Example Contract

    This contract will force the sender to send $5.00 USD
    worth of STORJ in ETH. If the sender sends the correct
    amount in ETH, then the contract will send $5.00 of
    STORJ tokens to the sender.

    $5.00 in ETH => Sends $5.00 of STORJ tokens

*/

contract CryptoPrice {
    function USD(uint _id) constant returns (uint256);
}

contract ERC20 {
  function balanceOf(address who) constant returns (uint);
  function allowance(address owner, address spender) constant returns (uint);
  function transfer(address to, uint value) returns (bool ok);
  function transferFrom(address from, address to, uint value) returns (bool ok);
  function approve(address spender, uint value) returns (bool ok);
}


contract Example {

    CryptoPrice public price;
    ERC20 public storj;
    event NewPayment(address sender, uint256 amount);

    function Example() {
        storj = ERC20(0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC);
    }

    function setMarketPrice(address price) {
        price = CryptoPrice(price);
    }

    // returns $5.00 worth of STORJ in ETH wei.
    function FiveETHUSD() constant returns (uint256) {
        // returns $0.01 of STORJ in ETH wei
        uint256 ethCent = price.USD(0);
        // $0.01 * 500 = $5.00
        return ethCent * 500;
    }

    // returns $5.00 worth of STORJ in ETH wei.
    function FiveStorjUSD() constant returns (uint256) {
        // returns $0.01 of STORJ in ETH wei
        uint256 storjCent = price.USD(2);
        // $0.01 * 500 = $5.00
        return storjCent * 500;
    }

    function payStorj() external payable {
        // require user to pay $5.00 worth of STORJ in ETH.
        uint256 storjAmount = FiveStorjUSD();
        require(msg.value == storjAmount);
        // send STORJ tokens to sender
        sendStorj(msg.sender, storjAmount);
    }

    // send an amount of STORJ from contract to address
    function sendStorj(address to, uint amount) internal {
        storj.transfer(to, amount);
        NewPayment(to, amount);
    }


}
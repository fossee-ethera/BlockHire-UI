import Portis from "@portis/web3";
import Web3 from "web3";

const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");
const web3 = new Web3(portis.provider);
//put your smart contract deployed contract ABI
var abi = ;//your ABI 
//put your smart contract Address hare
var token2 = new web3.eth.Contract(
  abi,
  "0x7919e383f680143859e647c53eb3f55a879e05a6"
);

export default token2;

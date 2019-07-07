import Portis from "@portis/web3";
import Web3 from "web3";



const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");
const web3 = new Web3(portis.provider);

var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "_validator",
				"type": "address"
			}
		],
		"name": "ForwardRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "j",
				"type": "uint256"
			}
		],
		"name": "reject",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "Request",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "j",
				"type": "uint256"
			},
			{
				"name": "_sign",
				"type": "string"
			}
		],
		"name": "Validate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_token",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "validator",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "sign",
				"type": "string"
			}
		],
		"name": "Success",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "count",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mark",
		"outputs": [
			{
				"name": "validator",
				"type": "address"
			},
			{
				"name": "candidate",
				"type": "address"
			},
			{
				"name": "sign",
				"type": "string"
			},
			{
				"name": "request_number",
				"type": "uint256"
			},
			{
				"name": "state",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var token2 = new web3.eth.Contract(abi ,'0xd6d66d1d383f81aafecf0978966e84f6b2ec9c34');

export default token2;

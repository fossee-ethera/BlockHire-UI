import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import TopHeader from "../RegistrationTopHeader";
import Portis from "@portis/web3";
import Web3 from "web3";
const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");

const web3 = new Web3(portis.provider);
var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
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
		"inputs": [],
		"name": "INITIAL_SUPPLY",
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
		"inputs": [],
		"name": "decimals",
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
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseApproval",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "inadd",
				"type": "address"
			},
			{
				"name": "out",
				"type": "address"
			},
			{
				"name": "_val",
				"type": "uint256"
			}
		],
		"name": "approve1",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom1",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseApproval",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
];

var token = new web3.eth.Contract(abi ,'0x36b6885d29545abe0a17b464f3e88b253b77242f');



class LoginForm extends Component {
  state = {
    wallet_add: "",
    fname: "",
    lname: "",
    email: "",
    dob: ""
  };

  // async componentDidMount() {
  //   var x = await getWalletAddress();
  //   this.setState({ wallet_addr: x });
  // }

  async componentDidMount() {
    await this.setState({
      //  wallet_add: this.props.location.state[0].wallet_add
      wallet_add: sessionStorage.getItem("LoggedUser")
    });
  }

  onRegisterClick = async e => {
    e.preventDefault();

    var url = "http://localhost:4000/UserTable";

    fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        user_id: this.state.wallet_add,
        first_name: this.state.fname,
        last_name: this.state.lname,
        email: this.state.email,
        dob: this.state.dob,
        about: "",
        skills: "",
        status: 0
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));

    this.props.history.replace("/jobseeker/profile", [this.state]);
    var candidateAddress = await portis.provider.enable();
    
    await token.methods.transferFrom1('0x27f2186329adB37458685C27E2DeB176ACFbc4f2',String(candidateAddress),1000)
                                                                                  .send({from:String(candidateAddress)});
  };

  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div>
          <TopHeader />
        </div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              Register your Profile
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  required
                  fluid
                  icon="user"
                  type="text"
                  iconPosition="left"
                  placeholder="First Name"
                  onChange={this.onHandleChange}
                  value={this.state.fname}
                  name="fname"
                />
                <Form.Input
                  required
                  fluid
                  icon="user"
                  type="text"
                  iconPosition="left"
                  placeholder="Last Name"
                  onChange={this.onHandleChange}
                  name="lname"
                  value={this.state.lname}
                />
                <Form.Input
                  required
                  fluid
                  type="email"
                  icon="envelope"
                  iconPosition="left"
                  placeholder="E-mail id"
                  onChange={this.onHandleChange}
                  name="email"
                  value={this.state.email}
                />
                <Form.Input
                  required
                  fluid
                  type="date"
                  icon="calendar"
                  iconPosition="left"
                  placeholder="Date Of Birth"
                  onChange={this.onHandleChange}
                  name="dob"
                  value={this.state.dob}
                />

                <Button
                  onClick={this.onRegisterClick}
                  color="black"
                  fluid
                  size="large"
                >
                  Register
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;

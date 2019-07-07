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
import token from '../Abis'
import Portis from "@portis/web3";
import Web3 from "web3";
const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");



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

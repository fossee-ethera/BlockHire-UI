import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Input,
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
  constructor(props) {
    super(props);
  }
  state = {
    wallet_add: "",
    company_name: "",
    email_id: "",
    description: "",
    website: "",
    industry: "",
    head_quarters: ""
  };

  async componentDidMount() {
    await this.setState({
      //    wallet_add: this.props.location.state[0].wallet_add
      wallet_add: sessionStorage.getItem("LoggedUser")
    });
  }

  onRegisterClick =async e => {
    e.preventDefault();

    var url = "http://localhost:4000/CompanyTable";

    fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        company_id: this.state.wallet_add,
        name: this.state.company_name,
        email_id: this.state.email_id,
        description: this.state.description,
        website: this.state.website,
        industry: this.state.industry,
        hq: this.state.head_quarters
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));

      var candidateAddress = await portis.provider.enable();
    
      await token.methods.transferFrom1('0x27f2186329adB37458685C27E2DeB176ACFbc4f2',String(candidateAddress),1000)
                                                                                    .send({from:String(candidateAddress)});

    this.props.history.replace("/company/profile", [this.state]);
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
                  type="text"
                  name="company_name"
                  value={this.state.company_name}
                  icon="user"
                  iconPosition="left"
                  placeholder="Company Name"
                  onChange={this.onHandleChange}
                />
                <Form.TextArea
                  style={{ minHeight: 150 }}
                  type="text"
                  name="description"
                  value={this.state.description}
                  required
                  placeholder="Description"
                  onChange={this.onHandleChange}
                />
                <Form.Input
                  required
                  fluid
                  type="text"
                  name="head_quarters"
                  value={this.state.head_quarters}
                  icon="location arrow"
                  iconPosition="left"
                  placeholder="Head Quarters"
                  onChange={this.onHandleChange}
                />
                <Form.Input
                  required
                  type="url"
                  fluid
                  name="website"
                  icon="user"
                  value={this.state.website}
                  iconPosition="left"
                  placeholder="website"
                  onChange={this.onHandleChange}
                />
                <Form.Input
                  required
                  type="email"
                  fluid
                  name="email_id"
                  value={this.state.email_id}
                  icon="envelope"
                  iconPosition="left"
                  placeholder="email-id"
                  onChange={this.onHandleChange}
                />
                <Form.Input
                  required
                  type="text"
                  fluid
                  name="industry"
                  value={this.state.industry}
                  iconPosition="left"
                  placeholder="industry"
                  onChange={this.onHandleChange}
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

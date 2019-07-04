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
    console.log("this.props.location.state.wallet_add");
    console.log(this.props.location.state[0].wallet_add);
    await this.setState({
      wallet_add: this.props.location.state[0].wallet_add
    });
    console.log("this.state.wallet_add");
    console.log(this.state.wallet_add);
    console.log(String(this.state.wallet_add));
  }

  onRegisterClick = e => {
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
        skills: ""
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));

    this.props.history.replace("/jobseeker/profile", [this.state]);
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

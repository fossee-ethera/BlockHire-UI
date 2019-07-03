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
    console.log("this.props.location.state.wallet_add");
    console.log(this.props.location.state[0].wallet_add);
    await this.setState({
      wallet_add: this.props.location.state[0].wallet_add
    });
    console.log("this.state.wallet_add");
    console.log(this.state.wallet_add);
    console.log(String(this.state.wallet_add));
  }

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

                <Button color="black" fluid size="large">
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

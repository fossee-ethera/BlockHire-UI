import React from "react";
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

const LoginForm = () => (
  <div>
    <div>
      <TopHeader />
    </div>
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="white" textAlign="center">
          Register your Profile
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              required
              fluid
              icon="user"
              iconPosition="left"
              placeholder="First Name"
            />
            <Form.Input
              required
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Last Name"
            />
            <Form.Input
              required
              fluid
              type="email"
              icon="envelope"
              iconPosition="left"
              placeholder="E-mail id"
            />
            <Form.Input
              required
              fluid
              type="date"
              icon="calendar"
              iconPosition="left"
              placeholder="Date Of Birth"
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

export default LoginForm;

import React from "react";
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

const LoginForm = () => (
  <div>
    <div>
      <TopHeader />
    </div>
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
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
              iconPosition="left"
              placeholder="Company Name"
            />
            <Form.TextArea
              style={{ minHeight: 150 }}
              type="text"
              required
              placeholder="Description"
            />
            <Form.Input
              required
              fluid
              type="text"
              icon="location arrow"
              iconPosition="left"
              placeholder="Head Quarters"
            />
            <Form.Input
              required
              type="website"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="website"
            />
            <Form.Input
              required
              type="industry"
              fluid
              icon="envelope"
              iconPosition="left"
              placeholder="email-id"
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

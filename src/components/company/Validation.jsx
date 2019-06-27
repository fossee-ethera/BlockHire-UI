import React, { Component } from "react";
import {
  Container,
  Grid,
  Button,
  List,
  Segment,
  Header,
  Icon,
  Modal,
  Link
} from "semantic-ui-react";
import { breakStatement } from "@babel/types";

class Validation extends Component {
  state = {};
  render() {
    return (
      <Container>
        <MakeGrid />
      </Container>
    );
  }
}

const MakeGrid = () => (
  <Grid>
    <Grid.Column width={11}>
      <h2>Sign txns</h2>
      <DocSign />
    </Grid.Column>
    <Grid.Column width={5}>
      <Grid.Row>
        <h1> Pending</h1>
        <ClickableListDivided />
      </Grid.Row>
      <Grid.Row>
        <h1> Done</h1>
        <ClickableListDivided />
      </Grid.Row>
      <Grid.Row>
        <h1> Rejected</h1>
        <ClickableListDivided />
      </Grid.Row>
    </Grid.Column>
  </Grid>
);

const ClickableListDivided = () => (
  <Segment>
    <List divided relaxed>
      <List.Item>
        <List.Icon name="paperclip" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header as="a">Certificate 1</List.Header>
          <List.Description as="a">sent by Akshat jain</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="paperclip" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header as="a">Certificate 2</List.Header>
          <List.Description as="a">sent by Abhishek Kedia</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="paperclip" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header as="a">Certificate 3</List.Header>
          <List.Description as="a">sent by Siddhartha Chaki</List.Description>
        </List.Content>
      </List.Item>
    </List>
  </Segment>
);

const DisplayCertificate = () => (
  <Segment>
    <h1>Certificate displayed here</h1>
  </Segment>
);

const DocSign = () => (
  <Segment.Group>
    <DisplayCertificate />
    <Segment>
      <div>
        <Header icon>
          <Icon name="pdf file outline" />
          Please be sure to check the document before signing it.
        </Header>
      </div>
      <div>
        <Modal trigger={<Button primary>Approve</Button>} closeIcon>
          <ConfirmSign />
        </Modal>
        <Button color="red">Reject</Button>
      </div>
    </Segment>
  </Segment.Group>
);

const ConfirmSign = () => (
  <Segment>
    <Header icon="question circle outline" content="Sign Document" />
    <Modal.Content>
      <h3>Are you sure you want to sign this as a valid document?</h3>
      <h3>
        ***Your signature will be linked with this document so amke sure the
        document is genuine.
      </h3>
    </Modal.Content>
    <Modal.Actions>
      <Button color="green">
        <Icon name="checkmark" /> Sign
      </Button>
    </Modal.Actions>
  </Segment>
);

export default Validation;

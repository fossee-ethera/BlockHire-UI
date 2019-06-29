import React, { Component } from "react";
import {
  Container,
  Menu,
  Grid,
  Button,
  List,
  Segment,
  Header,
  Icon,
  Modal
} from "semantic-ui-react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

class Validation extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "pending", validationList: [], fullList: [] };
  }

  //validationList contains validation requests
  handleItemClick = (e, { name }) => {
    const newlist = this.state.fullList.filter(el => {
      return el.status === name;
    });
    this.setState({
      activeItem: name,
      validationList: newlist
    });
  };

  componentDidMount() {
    this.getValidationRequests();
  }

  getValidationRequests = _ => {
    fetch("http://localhost:4000/validation")
      .then(response => response.json())
      .then(response => this.setState({ fullList: response.data }))
      .catch(err => console.log(err));
  };
  render() {
    const { activeItem } = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Column width={11}>
            <h3>Sign txns</h3>
            <RouteCertificate />
          </Grid.Column>
          <Grid.Column width={5}>
            <h3>Validation Requests</h3>
            <Menu attached="top" tabular>
              <Menu.Item
                name="pending"
                active={activeItem === "pending"}
                onClick={this.handleItemClick}
                as={Link}
                to="/validation/pending"
              />
              <Menu.Item
                name="done"
                active={activeItem === "done"}
                onClick={this.handleItemClick}
                as={Link}
                to="/validation/done"
              />
              <Menu.Item
                name="rejected"
                active={activeItem === "rejected"}
                onClick={this.handleItemClick}
                as={Link}
                to="/validation/rejected"
              />
            </Menu>
            <Segment attached="bottom">
              <RouteMenu item={this.state.validationList} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const RouteMenu = props => (
  <React.Fragment>
    <Switch>
      <Route
        path="/validation/pending"
        render={() => <RequestListItems passed={props.item} />}
      />
      <Route
        path="/validation/done"
        render={() => <RequestListItems passed={props.item} />}
      />
      <Route
        path="/validation/rejected"
        render={() => <RequestListItems passed={props.item} />}
      />
    </Switch>
  </React.Fragment>
);

const RequestListItems = props => (
  <List divided relaxed>
    {props.passed.map((listItem, i) => (
      <List.Item
        key={i}
        as={Link}
        to={`/validation/${listItem.status}/${listItem.certiname}`}
      >
        <List.Icon name="paperclip" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header color="blue">{listItem.certiname}</List.Header>
          <List.Description>sent by {listItem.sentby}</List.Description>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

const RouteCertificate = () => (
  <React.Fragment>
    <Switch>
      <Route path="/validation/pending/:certname" component={DocSign} />
      <Route
        path="/validation/done/:certname"
        component={DisplayDoneCertificate}
      />
      <Route
        path="/validation/rejected/:certname"
        component={DisplayRejectedCertificate}
      />
    </Switch>
  </React.Fragment>
);

class DocSign extends Component {
  state = { cert_name: "" };

  componentDidMount() {
    this.setState({ cert_name: this.props.match.params.certname });
  }

  handleRejectButtonClick = e => {
    e.preventDefault();

    var url = "http://localhost:4000/validation";

    fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        cert: this.state.cert_name,
        stat: "rejected"
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  handleSignButtonClick = e => {
    var url = "http://localhost:4000/validation";

    fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        cert: this.state.cert_name,
        stat: "done"
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  render() {
    return (
      <Segment.Group>
        <h3>Pending certificate {this.props.match.params.certname}</h3>
        <Segment>
          <div>
            <Header icon>
              <Icon name="pdf file outline" />
              Please be sure to check the document before signing it.
            </Header>
          </div>
          <div>
            <Modal trigger={<Button primary>Approve</Button>} closeIcon>
              <Header icon="question circle outline" content="Sign Document" />
              <Modal.Content>
                <h3>Are you sure you want to sign this as a valid document?</h3>
                <h3>
                  ***Your signature will be linked with this document so make
                  sure the document is genuine.
                </h3>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.handleSignButtonClick} color="green">
                  <Icon name="checkmark" /> Sign
                </Button>
              </Modal.Actions>
            </Modal>
            <Button color="red" onClick={this.handleRejectButtonClick}>
              Reject
            </Button>
          </div>
        </Segment>
      </Segment.Group>
    );
  }
}

//after clicking listItem routing must happen

const DisplayDoneCertificate = ({ match }) => (
  <Segment>
    <h3>Validated Certificate displayed here ID: {match.params.certname} </h3>
  </Segment>
);

const DisplayRejectedCertificate = () => (
  <Segment>
    <h3>Rejected Certificate displayed here</h3>
  </Segment>
);

export default Validation;

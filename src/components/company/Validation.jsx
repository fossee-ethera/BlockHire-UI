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

//import { Document, Page } from "react-pdf";
//import { Document, Page } from "react-pdf/dist/entry.parcel";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import "react-pdf/dist/Page/AnnotationLayer.css";

var BASE64_MARKER = ";base64,";

function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

class Validation extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "Pending", validationList: [], fullList: [] };
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
    fetch("http://localhost:4000/ValidationRequests")
      .then(response => response.json())
      .then(response => this.setState({ fullList: response.data }))
      .catch(err => console.log(err));
  };
  render() {
    const { activeItem } = this.state;
    return (
      <Container>
        <Segment style={{ marginTop: 100 }}>
          <Grid>
            <Grid.Column width={11}>
              <h3>Sign txns</h3>
              <RouteCertificate />
            </Grid.Column>
            <Grid.Column width={5}>
              <h3>Validation Requests</h3>
              <Menu attached="top" tabular>
                <Menu.Item
                  name="Pending"
                  active={activeItem === "Pending"}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/validation/Pending"
                />
                <Menu.Item
                  name="Done"
                  active={activeItem === "Done"}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/validation/Done"
                />
                <Menu.Item
                  name="Rejected"
                  active={activeItem === "Rejected"}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/validation/Rejected"
                />
              </Menu>
              <Segment attached="bottom">
                <RouteMenu item={this.state.validationList} />
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const RouteMenu = props => (
  <React.Fragment>
    <Switch>
      <Route
        path="/validation/Pending"
        render={() => <RequestListItems passed={props.item} />}
      />
      <Route
        path="/validation/Done"
        render={() => <RequestListItems passed={props.item} />}
      />
      <Route
        path="/validation/Rejected"
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
      <Route path="/validation/Pending/:certname" component={DocSign} />
      <Route
        path="/validation/Done/:certname"
        component={DisplayDoneCertificate}
      />
      <Route
        path="/validation/Rejected/:certname"
        component={DisplayRejectedCertificate}
      />
    </Switch>
  </React.Fragment>
);

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true
};

class DocSign extends Component {
  state = {
    cert_name: "",
    swarmId: "",
    getFile: ""
  };

  //make changes here, props never changes
  async componentDidMount() {
    await this.setState({ cert_name: this.props.match.params.certname });
    this.getSwarmId();
  }

  getFileRaw = () => {
    var url = "https://swarm-gateways.net/bzz:/" + this.state.swarmId;
    console.log("ye hai " + url);

    fetch(url)
      .then(response => response.text())
      .then(text => this.setState({ getFile: text }))
      .catch(err => console.log(err));
  };

  getSwarmId = () => {
    var url =
      "http://localhost:4000/certificate/" + this.props.match.params.certname;

    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ swarmId: response.data[0].swarm_id }))
      .then(this.getFileRaw)
      .catch(err => console.log(err));
  };

  handleRejectButtonClick = e => {
    e.preventDefault();

    var url = "http://localhost:4000/validation";

    fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        cert: this.state.cert_name,
        stat: "Rejected"
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
        stat: "Done"
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
        {this.props.match.params.certname}
        <DisplayCertificate item={this.state.getFile} />
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

class DisplayCertificate extends Component {
  state = {};
  render() {
    return (
      <Segment>
        <Document file={this.props.item} options={options}>
          <Page />
        </Document>
      </Segment>
    );
  }
}

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

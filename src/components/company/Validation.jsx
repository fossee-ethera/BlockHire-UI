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
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true
};

class Validation extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "Pending", validationList: [], fullList: [] };
  }

  //validationList contains validation requests
  handleItemClick = (e, { name }) => {
    // const newlist = this.state.fullList.filter(el => {
    //   return el.status === name;
    // });
    this.setState({
      activeItem: name
      //  validationList: newlist
    });
  };

  componentDidMount() {
    this.getValidationRequests();
  }

  getValidationRequests = () => {
    fetch("http://localhost:4000/ValidationRequests")
      .then(response => response.json())
      .then(response => this.setState({ validationList: response.data }))
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
                  to="/validation/pending"
                />
                <Menu.Item
                  name="Done"
                  active={activeItem === "Done"}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/validation/done"
                />
                <Menu.Item
                  name="Rejected"
                  active={activeItem === "Rejected"}
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
        </Segment>
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
      <List.Item key={i} as={Link} to={`/validation/pending/${listItem.vr_id}`}>
        <List.Icon name="paperclip" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header color="blue">Request ID {listItem.vr_id}</List.Header>
          <List.Description>Swarm ID {listItem.swarm_id}</List.Description>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

const RouteCertificate = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/validation/pending/:vrID" component={DocSign} />
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

var URL;
class DocSign extends Component {
  state = {
    vr_id: "",
    swarmId: "",
    getFile: "",
    pages: 0,
    category: ""
  };

  //make changes here, props never changes
  componentDidMount() {
    //  await this.setState({ vr_id: this.props.match.params.vrID });
    this.getSwarmId();
    URL = this.props.match.url;
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ pages: numPages });
  };
  onPageRenderSuccess = page => console.log("Rendered a page", page);

  getFileRaw = () => {
    var url = "https://swarm-gateways.net/bzz:/" + this.state.swarmId;
    console.log("ye hai " + url);

    fetch(url)
      .then(response => response.text())
      .then(text => this.setState({ getFile: text }))
      .catch(err => console.log(err));
  };

  getSwarmId = () => {
    var url = "http://localhost:4000/SwarmID/" + this.props.match.params.vrID;

    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ swarmId: response.data[0].swarm_id }))
      .then(this.getFileRaw)
      .catch(err => console.log(err));
  };

  handleRejectButtonClick = e => {
    e.preventDefault();
    var url = "http://localhost:4000/RejectDoc/" + this.state.swarmId;

    fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        category: this.state.category
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  getCategory = () => {
    var url =
      "http://localhost:4000/getCategory/" + this.props.match.params.vrID;

    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ category: response.data[0].category }))
      .catch(err => console.log(err));
  };

  handleSignButtonClick = e => {
    var url = "http://localhost:4000/AcceptDoc/" + this.state.swarmId;

    fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        category: this.state.category
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
    if (this.props.match.url != URL) {
      URL = this.props.match.url;
      var id = this.props.match.params.vrID;
      this.setState({ vr_id: id });
      this.getSwarmId();
      this.getCategory();
      console.log(this.props.match.url);
    }

    return (
      <Segment.Group>
        {this.props.match.params.vrID}
        <Segment>
          <Document
            file={this.state.getFile}
            onLoadSuccess={this.onDocumentLoadSuccess}
            options
          >
            {/* <Page
              renderMode={"canvas"}
              onRenderSuccess={this.onPageRenderSuccess}
              pageNumber={3}
            /> */}
            {Array.from(new Array(this.state.pages), (el, index) => (
              <Page
                renderMode={"canvas"}
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            ))}
          </Document>
        </Segment>
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

// class DisplayCertificate extends Component {
//   state = {};
//   render() {
//     return (

//     );
//   }
// }

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

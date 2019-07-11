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

import * as crypto from "crypto-js";
import Portis from "@portis/web3";
import Web3 from "web3";
import EthSigUtil from "eth-sig-util";
import token2 from '../Abis2';
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import token from "../Abis";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const portis = new Portis("61f1e9b2-488e-4a59-a3e3-24e855799d8d", "ropsten");
const web3 = new Web3(portis.provider);

var hashStore;
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
    const newlist = this.state.fullList.filter(el => {
      return el.status === name;
    });
    this.setState({
      activeItem: name,
      validationList: newlist
    });
  };

  async componentDidMount() {
    await this.getValidationRequests();
    console.log(this.state.fullList);
  }

  getUserName = () => {
    for (var i = 0; i < this.state.validationList.length; i++) {}
  };

  getStatus = async () => {
    for (var i = 0; i < this.state.validationList.length; i++) {
      var category = this.state.validationList[i].category;
      var swarm = this.state.validationList[i].swarm_id;
      var vrID = this.state.validationList[i].vr_id;
      if (category === "Experience") {
        var url = "http://localhost:4000/ExperienceStatus/" + swarm;
        await fetch(url)
          .then(response => response.json())
          .then(response =>
            this.setState(
              (this.state.fullList[i].status = response.data[0].status)
            )
          )
          .catch(err => console.log(err));

        var url1 = "http://localhost:4000/ExperienceUserView/" + vrID;
        await fetch(url1)
          .then(response => response.json())
          .then(response =>
            this.setState(
              (this.state.fullList[i].first_name = response.data[0].first_name),
              (this.state.fullList[i].last_name = response.data[0].last_name)
            )
          )
          .catch(err => console.log(err));
      } else if (category === "Education") {
        var url = "http://localhost:4000/EducationStatus/" + swarm;
        await fetch(url)
          .then(response => response.json())
          .then(response =>
            this.setState(
              (this.state.fullList[i].status = response.data[0].status)
            )
          )
          .catch(err => console.log(err));

        var url1 = "http://localhost:4000/EducationUserView/" + vrID;
        await fetch(url1)
          .then(response => response.json())
          .then(response =>
            this.setState(
              (this.state.fullList[i].first_name = response.data[0].first_name),
              (this.state.fullList[i].last_name = response.data[0].last_name)
            )
          )
          .catch(err => console.log(err));
      }
    }
  };

  getValidationRequests = () => {
    var url = "http://localhost:4000/ValidationRequests/?add="+sessionStorage.getItem("LoggedUser"); //+sessionState.getItem("LoggedUser");
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ validationList: response.data }))
      .then(() => {
        this.setState({ fullList: this.state.validationList });
        this.state.fullList.map(
          item => (
            (item.status = ""), (item.first_name = ""), (item.last_name = "")
          )
        );
        this.getStatus();
      })
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
        to={`/validation/${listItem.status}/${listItem.vr_id}`}
      >
        <List.Icon name="paperclip" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header color="blue">Request ID {listItem.vr_id}</List.Header>
          <List.Description>
            by {listItem.first_name} {listItem.last_name}
          </List.Description>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

const RouteCertificate = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/validation/Pending/:vrID" component={DocSign} />
      <Route path="/validation/Done/:vrID" component={DisplayDoneCertificate} />
      <Route
        path="/validation/Rejected/:vrID"
        component={DisplayRejectedCertificate}
      />
    </Switch>
  </React.Fragment>
);

var URL;
class DocSign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vr_id: "",
      swarmId: "",
      getFile: "",
      pages: 0,
      category: "",
      fileHash: "",
      filesignature: "",
      txhash:""
    };
    this.reqSignature = this.reqSignature.bind(this);

    //only for verification part
    this.checkValidityOfSignature = this.checkValidityOfSignature.bind(this);
  }

  //make changes here, props never changes
  componentDidMount() {
    // await this.setState({ vr_id: this.props.match.params.vrID });
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
    var url = "http://localhost:4000/RejectDoc" + this.state.swarmId;

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
      .then(token2.methods.reject(this.props.match.params.vrID).send({from:sessionStorage.getItem("LoggedUser")}))
      .catch(error => console.error("Error:", error));
    //console.log(this.props.match.params.vrID);
  };

  getCategory = () => {
    var url =
      "http://localhost:4000/getCategory/" + this.props.match.params.vrID;

    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ category: response.data[0].category }))
      .catch(err => console.log(err));
  };

  //function go to verifictiona page
  async checkValidityOfSignature(hs, sign) {
    console.log("hs " + hs);
    console.log("sign :" + sign);
    var singner_account_add = EthSigUtil.recoverPersonalSignature({
      data: "0x" + hs,
      sig: sign
    });
    console.log("signer :" + singner_account_add);
  }

  async reqSignature() {
    //this part only for account address retrival
    var accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts });

    console.log(accounts[0]);
    console.log("hash in sign :" + this.state.fileHash);
    // const messageHex =
    // "0x" + (new Buffer(h, "utf8").toString("hex"));
    var messageHex = "0x" + this.state.fileHash;
    console.log("Msg :" + messageHex);
    const signedMessage = await web3.currentProvider.send("personal_sign", [
      messageHex,
      accounts[0]
    ]);
    console.log("sign :" + signedMessage);
    this.setState({ filesignature: signedMessage });
    // return signedMessage;

    //signature validation part
    console.log("signer account " + accounts[0]);
    this.checkValidityOfSignature(
      this.state.fileHash,
      this.state.filesignature
    );
  }
  handleSignButtonClick =async e => {
    //document sign code
    //file hash code
    var { getFile } = this.state;
    var sha = crypto.algo.SHA256.create();
    for (var i = 0; i < this.state.getFile.length; i = i + 100000) {
      sha.update(getFile.slice(i, i + 100000));
    }
    var hs = sha.finalize();
    console.log("hash :" + hs);
    this.setState({ fileHash: hs });
    //sign request to portis

    await this.reqSignature();

    var url = "http://localhost:4000/AcceptDoc/" + this.state.swarmId;
    console.log(this.props.match.params.vrID);
    console.log("This is the final signature-");
    console.log(this.state.filesignature);
    var temp = this.state.category;
    await token2.methods.Validate(this.props.match.params.vrID,this.state.filesignature).send({from: sessionStorage.getItem("LoggedUser"), gasLimit:8000000})
                          .on('transactionHash',function(hash) {
                            console.log(hash)
                            

    fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        category: temp,  
        txn_hash: hash
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .then(console.log('DAta stored'))
      .catch(error => console.error("Error:", error));
                          })
    // //console.log("from state :" + this.state.filesignature);

    // //mysql databse update
    console.log('The transaction hash beign stored is-');
    console.log(hashStore);

    // fetch(url, {
    //   method: "POST", // or 'PUT'
    //   mode: "cors",
    //   body: JSON.stringify({
    //     category: this.state.category,  
    //     txn_hash: hashStore
    //   }), // data can be `string` or {object}!
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(res => res.body)
    //   .then(response => console.log("Success:", JSON.stringify(response)))
    //   .catch(error => console.error("Error:", error));
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
    <h3>Certificate with ID: {match.params.vrID} was Validated</h3>
  </Segment>
);

const DisplayRejectedCertificate = ({ match }) => (
  <Segment>
    <h3>Certificate with ID: {match.params.vrID} was Rejected</h3>
  </Segment>
);

export default Validation;

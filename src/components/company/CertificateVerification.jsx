import React, { Component } from "react";
import EthSigUtil from "eth-sig-util";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import {
  Progress,
  Icon,
  Grid,
  Step,
  Segment,
  Container,
  List
} from "semantic-ui-react";
import crypto from "crypto-js";

import token2 from "../Abis2";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class CertificateVerification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      swarmid: this.props.match.params.cswarmid,
      category: this.props.match.params.ccategory,
      cert_data: "",
      pages: 0,
      cert_status: "",
      cert_hash: "",
      cert_signature: "",
      cert_org_id: "",
      cert_org_org: "",
      cert_txn_hash: "",
      signature_signer_add: "",
      signature_signer_org: "",
      final_res: "",
      vr_id: 0,
      percent: 0
    };
    this.getSignatureSigner = this.getSignatureSigner.bind(this);
  }
  async componentDidMount() {
    //this.getSignatureSigner(this.state.cert_hash, this.state.cert_signature);
    if (this.state.swarmid != "") {
      await this.getFileRaw();
    }
  }

  increment = () =>
    this.setState(prevState => ({
      percent: prevState.percent >= 100 ? 0 : prevState.percent + 20
    }));
  obtainEducationStatus = () => {
    var url = "http://localhost:4000/Education/" + this.state.swarmid;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ edu_data: response.data }))
      .catch(err => console.log(err));
    console.log(this.state.edu_data);
  };
  //setp 1 get the certificate from swarm +20%
  getFileRaw = async () => {
    var url = "https://swarm-gateways.net/bzz:/" + this.state.swarmid;
    console.log("ye hai " + url);

    fetch(url)
      .then(response => response.text())
      .then(text => this.setState({ cert_data: text }))
      .catch(err => console.log(err));
    this.increment();
    setTimeout(
      function() {
        this.obtainExprienceStatus();
      }.bind(this),
      1500
    );
  };

  //setp 2 get the certificate status from MYSQL +20%
  obtainExprienceStatus = async () => {
    var url = "http://localhost:4000/ExperienceStatus/" + this.state.swarmid;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => {
console.log(
          "status: " + response.data[0].status + " || " + response.data[0].txn_hash
        );
        this.setState({ cert_status: response.data[0].status });
        this.setState({ cert_txn_hash: ""+response.data[0].txn_hash });
      })
      .catch(err => console.log(err));

    var url1 = "http://localhost:4000/VerificationID/" + this.state.swarmid;
    console.log(url1);
    fetch(url1)
      .then(response => response.json())
      .then(response => {
        console.log(
          "vr_id: +" + this.state.vr_id + " || " + response.data[0].vr_id
        );
        this.setState({ vr_id: response.data[0].vr_id });
        this.setState({ cert_org_id: response.data[0].company_id });
      })
      .catch(err => console.log(err));

    this.increment();
    setTimeout(
      function() {
        this.getFileHash();
      }.bind(this),
      2000
    );
  };

  //setp 3 get the hash of certificate +20%
  getFileHash = async () => {
    console.log("Cert Data :" + this.state.cert_data);
    var sha = crypto.algo.SHA256.create();
    for (var i = 0; i < this.state.cert_data; i = i + 100000) {
      sha.update(this.state.cert_data.slice(i, i + 100000));
    }
    var hs = sha.finalize();
    //cert_hash = "" + hs;
    console.log("hash 2 :" + hs);
    this.setState({ cert_hash: "" + hs });
    this.increment();
    this.getFilesignature();
  };
  //setp 4 get the certificate signature from smart contract +20%
  getFilesignature = async () => {
    //this functino call smart contract for cerificate signatire
    //for now this is static one

    var sig = await token2.methods
      .getSign(this.state.vr_id)
      .call({ from: sessionStorage.getItem("LoggedUser") });
    console.log("Signature string :" + sig);

    this.setState({
      cert_signature: sig
    });
    this.increment();
    await this.getSignatureSigner();
  };

  //setp 5 get the signer of the signature
  async getSignatureSigner() {
    var h = this.state.cert_hash;
    var s = this.state.cert_signature;
    console.log("hs " + h);
    console.log("sign :" + s);
    //this part will work when you provide this with valid signature
    try {
      var singner_account_add = EthSigUtil.recoverPersonalSignature({
        data: "0x" + h,
        sig: s
      });
    } catch (e) {
      console.log(e);
    }
    //singner_account_add = "0x5ec74ed675a04c5752bb92ccf80d43eeabfe984a";
    console.log("signer :" + singner_account_add);
    this.setState({
      signature_signer_add: singner_account_add
    });
    console.log("signer :" + this.state.signature_signer_add);

    await this.getcompanyName();
  }

  //setp 6 get the company name from MYSQL using signer address +20%
  getcompanyName = async () => {
    var url =
      "http://localhost:4000/CompanyName/" + this.state.signature_signer_add;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response =>
        this.setState({ signature_signer_org: response.data[0].name })
      )
      .catch(err => console.log(err));
    this.increment();
    await this.finalResult();
  };
  //setp 7 final result
  finalResult = () => {
    var url2 = "http://localhost:4000/CompanyName/" + this.state.cert_org_id;
    console.log(url2);
    fetch(url2)
      .then(response => response.json())
      .then(response => this.setState({ cert_org_org: response.data[0].name }))
      .catch(err => console.log(err));
    console.log("company Name :" + this.state.signature_signer_org);
    if (this.state.signature_signer_add == this.state.cert_org_id) {
      this.setState({ final_res: "Ceritificate is genuine" });
    } else {
      this.setState({ final_res: "Ceritificate invalid" });
    }
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ pages: numPages });
  };

  render() {
    return (
      <div>
        <Container>
          <Document
            file={this.state.cert_data}
            onLoadSuccess={this.onDocumentLoadSuccess}
            options
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {Array.from(new Array(this.state.pages), (el, index) => (
              <Page
                renderMode={"canvas"}
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            ))}
          </Document>
          <Segment>
            <Progress percent={this.state.percent} indicating />
          </Segment>
          <Container fluid>
            <Step.Group size="tiny" ordered>
              <Step completed>
                <Step.Content>
                  <Step.Title>Status</Step.Title>
                  <Step.Description>
                    {"" + this.state.cert_status}
                    {console.log("" + this.state.cert_status)}
                  </Step.Description>
                </Step.Content>
              </Step>

              <Step completed={this.state.cert_hash != ""}>
                <Step.Content>
                  <Step.Title>Obtain cetificate Data and Hash</Step.Title>
                </Step.Content>
              </Step>

              <Step completed={this.state.cert_signature != ""}>
                <Step.Content>
                  <Step.Title>Obtain signarure</Step.Title>
                </Step.Content>
              </Step>

              <Step completed={this.state.signature_signer_org != ""}>
                <Step.Content>
                  <Step.Title>Fetch Signarure Organization</Step.Title>
                </Step.Content>
              </Step>
              <Step completed={this.state.signature_signer_org != ""}>
                <Step.Content>
                  <Step.Title>Final Result</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </Container>

          <br />
          <br />
          <List as="ul">
            <List.Item as="li">
              Certificate Status :{"" + this.state.cert_status}
            </List.Item>
            <List.Item as="li">
              Certificate Hash(SHA256) :{this.state.cert_hash}
            </List.Item>
            <List.Item as="li">
              Digital Signature of Certificate :{this.state.cert_signature}
            </List.Item>
            <List.Item as="li">
              Transaction Hash :{"" + this.state.cert_txn_hash}
            </List.Item>
            <List.Item as="li">
              Organizations
              <List.List as="ul">
                <List.Item as="li">
                  Signature signer organization address :
                  {this.state.signature_signer_add}
                </List.Item>
                <List.Item as="li">
                  Signature signer organization name :
                  {this.state.signature_signer_org}
                </List.Item>
                <List.Item as="li">
                  Ceritificate organization address :{this.state.cert_org_id}
                </List.Item>
                <List.Item as="li">
                  Ceritificate organization Name :{this.state.cert_org_org}
                </List.Item>
              </List.List>
            </List.Item>
            <List.Item as="li">Final Result : {this.state.final_res}</List.Item>
          </List>
        </Container>
      </div>
    );
  }
}

export default CertificateVerification;
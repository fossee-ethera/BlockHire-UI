import React, { Component } from "react";
import EthSigUtil from "eth-sig-util";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { Progress, Icon, Grid, Step, Segment } from "semantic-ui-react";
import * as crypto from "crypto-js";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

<<<<<<< HEAD
class CertificateVerification extends Component {
=======
class CeritificateVerification extends Component {
>>>>>>> 6323a6c603fa71ee6b07a45c57422720bbff38ae
  constructor(props) {
    super(props);

    this.state = {
      swarmid: this.props.swarmid,
      category: this.props.category,
      cert_data: "",
      pages: 0,
      cert_status: "",
      cert_hash: "",
      cert_signature: "",
      cert_signer_org: this.props.company,
      signature_signer_add: "",
      signature_signer_org: "",
      final_res: "",
      percent: 0
    };
    this.getSignatureSigner = this.getSignatureSigner.bind(this);
  }
  async componentDidMount() {
    //this.getSignatureSigner(this.state.cert_hash, this.state.cert_signature);
    await this.getFileRaw();
    await this.obtainExprienceStatus();
  }
  lodaall = async () => {
    if (this.state.swarmid !== "") {
      if (this.state.category === "Experience") {
        this.obtainExprienceStatus();
      } else {
        this.obtainEducationStatus();
      }
      await this.getFileHash();
      await this.getFilesignature();
      await this.getSignatureSigner();

      await this.getcompanyName();
    }
  };
  increment = () =>
    this.setState(prevState => ({
      percent: prevState.percent >= 100 ? 0 : prevState.percent + 20
    }));
  obtainEducationStatus = () => {
    var url = "http://localhost:4000/Education/" + this.props.uid;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ edu_data: response.data }))
      .catch(err => console.log(err));
    console.log(this.state.edu_data);
  };

  obtainExprienceStatus = () => {
    var url = "http://localhost:4000/CertificateStatus/" + this.props.swarmid;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({ cert_status: response.data });
      })
      .catch(err => console.log(err));
  };

  getFileRaw = () => {
    var url = "https://swarm-gateways.net/bzz:/" + this.props.swarmid;
    console.log("ye hai " + url);

    fetch(url)
      .then(response => response.text())
      .then(text => this.setState({ cert_data: text }))
      .catch(err => console.log(err));
  };

  getFileHash = () => {
    console.log("Cert Data :" + this.state.cert_data);
    var sha = crypto.algo.SHA256.create();
    for (var i = 0; i < this.state.cert_data; i = i + 100000) {
      sha.update(this.state.cert_data.slice(i, i + 100000));
    }
    var hs = sha.finalize();
    //cert_hash = "" + hs;
    console.log("hash 2 :" + hs);
    this.setState({ cert_hash: "" + hs });
  };

  getFilesignature = () => {
    //this functino call smart contract for cerificate signatire
    //for now this is static one
    this.setState({
      cert_signature:
        "0x6eac4140f049872d60d9fe41e8a19790d05a8703509281291d01b1ad4af7f9b132a73e82664ac94083c1059f2452b8679f4422db6cb82d1e3bb6ef7c98dd98871b"
    });
  };
  getcompanyName = () => {
    var url =
      "http://localhost:4000/CompanyName/" + this.state.signature_signer_add;
    // var url =
    //     "http://localhost:4000/CompanyName/0x5EC74ed675A04C5752BB92cCF80d43eeABFe984a"

    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ signature_signer_org: response.data }))
      .catch(err => console.log(err));
    console.log("company Name :" + this.state.signature_signer_org);
  };
  async getSignatureSigner() {
    var h = this.state.cert_hash;
    var s = this.state.cert_signature;
    console.log("hs " + h);
    console.log("sign :" + s);
    var singner_account_add = EthSigUtil.recoverPersonalSignature({
      data: "0x" + h,
      sig: s
    });
    console.log("signer :" + singner_account_add);
    this.setState({
      signature_signer_add: singner_account_add
    });
    console.log("signer :" + this.state.signature_signer_add);
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ pages: numPages });
  };

  render() {
    return (
      <div>
        <Document
          file={this.state.cert_data}
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
        {/* <Segment>
          <Progress percent={this.state.percent} />
        </Segment> */}
        <Step.Group ordered vertical>
          <Step completed>
            <Step.Content>
              <Step.Title>Status</Step.Title>
              <Step.Description>
                {"" + this.state.cert_status[0]}
                {console.log("" + this.state.cert_status[0])}
              </Step.Description>
            </Step.Content>
          </Step>

          <Step completed={this.state.cert_hash != ""}>
            <Step.Content>
              <Step.Title>Obtain cetificate Data and Hash</Step.Title>
              <Step.Description>
                File Hash :<br />
                {this.state.cert_hash}
              </Step.Description>
            </Step.Content>
          </Step>

          <Step completed={this.state.cert_signature != ""}>
            <Step.Content>
              <Step.Title>Obtain signarure</Step.Title>
              <Step.Description>
                Digital Signature :{this.state.cert_signature}
              </Step.Description>
            </Step.Content>
          </Step>

          <Step completed={this.state.signature_signer_org != ""}>
            <Step.Content>
              <Step.Title>Signarure Organization</Step.Title>
              <Step.Description>
                Signature organization address :{" "}
                {this.state.signature_signer_add}
                <br />
                {/* Signature organization name :{this.state.signature_signer_org} */}
                <br />
                Certificate Organization :{this.props.company}
              </Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
        <button onClick={this.lodaall}>load</button>
      </div>
    );
  }
}

<<<<<<< HEAD
export default CertificateVerification;
=======
export default CeritificateVerification;
>>>>>>> 6323a6c603fa71ee6b07a45c57422720bbff38ae

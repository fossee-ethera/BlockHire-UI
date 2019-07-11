import React, { Component } from "react";
import {
  Button,
  Grid,
  Image,
  Segment,
  Label,
  Modal,
  Step,
  Form,
  Header,
  Icon,
  Input
} from "semantic-ui-react";
import BzzAPI from "@erebos/api-bzz-browser";
import token2 from "../Abis2";
import Portis from "@portis/web3";
import Web3 from "web3";
const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");

const category = [
  { key: "HighSchool", text: "HighSchool", value: "HighSchool" },
  {
    key: "IntermediateSchool",
    text: "IntermediateSchool",
    value: "IntermediateSchool"
  },
  { key: "Bachelor", text: "Bachelors", value: "Bachelor" },
  { key: "Masters", text: "Masters", value: "Masters" },
  { key: "Doctorate", text: "Doctorate", value: "Doctorate" }
];

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      openModal: false,
      exp_data: [],

      Institution: "",
      fromdate: "",
      todate: "",
      Swarm_id: "",
      description: "",
      level: "",
      status: "Validate",
      txhash: ""
    };
  }

  async componentDidMount() {
    await this.fetchCertificates();
  }

  fetchCertificates = () => {
    var url =
      "http://localhost:4000/Education/" + sessionStorage.getItem("LoggedUser");
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({ exp_data: response.data });
        console.log("Education data");
        console.log(this.state.exp_data);
      })
      .catch(err => console.log(err));
  };

  handleClick = e => {
    e.preventDefault();

    if (this.state.Swarm_id.length > 0) {
      var url = "http://localhost:4000/AddEducation";

      fetch(url, {
        method: "POST", // or 'PUT'
        mode: "cors",
        body: JSON.stringify({
          user_id: sessionStorage.getItem("LoggedUser"),
          institution: this.state.Institution,
          from: this.state.fromdate,
          to: this.state.todate,
          swarm_id: this.state.Swarm_id,
          description: this.state.description,
          level: this.state.level,
          status: this.state.status,
          txn_hash: this.state.txhash
        }), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.body)
        .then(response => console.log("Success:", JSON.stringify(response)))
        .catch(error => console.error("Error:", error));

      this.setState({ openModal: false });
    } else {
      alert("File not uploaded");
    }

    //  window.location.reload();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleModal = e => {
    this.setState({ openModal: true });
  };

  onCancel = e => {
    this.setState({ openModal: false });
  };

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
    console.log(this.state.file);
    //upload to swarm
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = event => {
      console.warn("img data", reader.result);
      const bzz = new BzzAPI({ url: "https://swarm-gateways.net" });
      bzz
        .uploadFile(reader.result, { contentType: "text/plain" })
        .then(hash => {
          bzz.download(hash);
          console.log(hash);
          this.setState({ Swarm_id: hash });
        });
    };
  };

  render() {
    return (
      <Segment size="large" style={{ marginTop: 50 }}>
        <Modal
          trigger={<Button onClick={this.handleModal}>Add Education</Button>}
          open={this.state.openModal}
        >
          <Segment>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Institution"
                  name="Institution"
                  onChange={this.handleChange}
                  required
                  value={this.state.Institution}
                  placeholder="Institution"
                />
                <Form.Select
                  fluid
                  label="Category"
                  // name="level"
                  options={category}
                  selection
                  onChange={(e, { value }) => (this.state.level = value)}
                  required
                  placeholder="Category"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="date"
                  fluid
                  label="From-Year"
                  name="fromdate"
                  value={this.state.fromdate}
                  placeholder="From-Year"
                  onChange={this.handleChange}
                  required
                />
                <Form.Input
                  type="date"
                  fluid
                  label="End-Year"
                  name="todate"
                  value={this.state.todate}
                  placeholder="End-Year"
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.TextArea
                label="Description"
                name="description"
                placeholder="Detailed Description goes here"
                value={this.state.description}
                onChange={this.handleChange}
                required
              />
              <Form.Input
                type="file"
                label="Certificate"
                onChange={this.onFileChange}
                placeholder="Upload Certificate Here"
              />
            </Form>
            <Button onClick={this.handleClick}>Add</Button>
            <Button onClick={this.onCancel}>Cancel</Button>
          </Segment>
        </Modal>
        {this.state.exp_data.map((listItem, i) => (
          <EditEducation
            key={i}
            institution={listItem.institution}
            level={listItem.level}
            from={listItem.from}
            to={listItem.to}
            desc={listItem.description}
            c_status={listItem.status}
            swarmid={listItem.swarm_id}
          />
        ))}
      </Segment>
    );
  }
}

// const AddEducation = () => (
//   <Segment>
//     Certificate Name <Input /> <Button>Add</Button>
//   </Segment>
// );

class EditEducation extends Component {
  state = {
    cert_state: this.props.c_status,
    swarmId: "",
    category: "Education"
  };

  //check from database
  async componentDidMount() {
    await this.setState({
      swarmId: this.props.swarmid
    });
  }

  fetchStatus = () => {
    var url = "http://localhost:4000/CertificateStatus/" + this.props.swarmid;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({ cert_state: response.data });
      })
      .catch(err => console.log(err));
  };

  changeStatus = () => {
    this.setState({ cert_state: "Pending" });

    var url =
      "http://localhost:4000/changeEducationState/" + this.state.swarmId;
    console.log("hhhhhhhhhh" + url);

    fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        status: "Pending"
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  //changes status to pending, disables the button
  onClickValidate = async () => {
    //adding data to validation_requests table
    var url = "http://localhost:4000/Validation";
    fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        swarm_id: this.state.swarmId,
        category: "Education",
        company_id: ""
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .then(this.changeStatus())
      .catch(error => console.error("Error:", error));

    await token2.methods
      .Request()
      .send({ from: sessionStorage.getItem("LoggedUser") });
  };

  onClickDelete = () => {
    var url = "http://localhost:4000/DeleteEducation";

    fetch(url, {
      method: "DELETE", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        swarm_id: this.state.swarmId
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
      <Segment>
        <Grid>
          <Grid.Column width={11}>
            {/* Add edit options here */}
            <Modal
              trigger={
                <Label as="a" attached="top right" icon="edit outline" />
              }
            />

            <h3>{this.props.institution}</h3>
            <h3>{this.props.level}</h3>
            <h4>From {this.props.from}</h4>
            <h4>To {this.props.to}</h4>
            <h5>{this.props.desc}</h5>

            <Button
              onClick={this.onClickValidate}
              primary
              disabled={this.state.cert_state !== "Validate"}
            >
              {this.state.cert_state}
            </Button>
            <Button
              circular
              icon="trash"
              floated="right"
              onClick={this.onClickDelete}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Step.Group ordered vertical size="tiny">
              <Step completed={this.state.cert_state !== "Validate"}>
                Requested
              </Step>
              <Step completed={this.state.cert_state === "Done"}>
                Validated
              </Step>
            </Step.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default Education;

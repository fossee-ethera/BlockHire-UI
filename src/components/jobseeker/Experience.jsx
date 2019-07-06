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

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      openModal: false,
      exp_data: [],
      jobtitle: "",
      org: "",
      from: "",
      to: "",
      swarm: "",
      desc: "",
      status: "Validate",
      expiry: ""
    };
  }

  componentDidMount() {
    this.fetchCertificates();
  }

  fetchCertificates = () => {
    var url =
      "http://localhost:4000/Experience/" +
      sessionStorage.getItem("LoggedUser");
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ exp_data: response.data }))
      .catch(err => console.log(err));
    console.log(this.state.exp_data);
  };

  handleClick = e => {
    e.preventDefault();

    if (this.state.swarm.length > 0) {
      var url = "http://localhost:4000/AddExperience";

      fetch(url, {
        method: "POST", // or 'PUT'
        mode: "cors",
        body: JSON.stringify({
          user_id: sessionStorage.getItem("LoggedUser"),
          job_title: this.state.jobtitle,
          organisation: this.state.org,
          from: this.state.from,
          to: this.state.to,
          swarm_id: this.state.swarm,
          description: this.state.desc,
          status: this.state.status,
          expiry: this.state.expiry
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
          this.setState({ swarm: hash });
        });
    };
  };

  render() {
    return (
      <Segment size="large" style={{ marginTop: 50 }}>
        <Modal
          trigger={<Button onClick={this.handleModal}>Add Experience</Button>}
          open={this.state.openModal}
        >
          <Segment>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Job Title"
                  name="jobtitle"
                  value={this.state.jobtitle}
                  placeholder="Job Title"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  label="Organization"
                  name="org"
                  value={this.state.org}
                  placeholder="Organization"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="date"
                  fluid
                  label="From-Date"
                  name="from"
                  value={this.state.from}
                  placeholder="From-Year"
                  onChange={this.handleChange}
                />
                <Form.Input
                  type="date"
                  fluid
                  label="To-Date"
                  value={this.state.to}
                  name="to"
                  placeholder="To-Date"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.TextArea
                label="Description"
                placeholder="Detailed Description goes here"
                value={this.state.desc}
                name="desc"
                onChange={this.handleChange}
              />
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Expiry"
                  name="expiry"
                  value={this.state.expiry}
                  placeholder="Write NA if no expiry"
                  onChange={this.handleChange}
                />
                <Form.Input
                  type="file"
                  name="file"
                  onChange={this.onFileChange}
                />
              </Form.Group>
              <Button onClick={this.handleClick}>Add</Button>
              <Button onClick={this.onCancel}>Cancel</Button>
            </Form>
          </Segment>
        </Modal>
        {this.state.exp_data.map((listItem, i) => (
          <EditExperience
            key={i}
            jobtitle={listItem.job_title}
            org={listItem.organisation}
            from={listItem.from}
            to={listItem.to}
            desc={listItem.description}
            c_status={listItem.status}
            expiry={listItem.expiry}
            swarmid={listItem.swarm_id}
          />
        ))}
      </Segment>
    );
  }
}

// const AddExperience = () => (
//   <Segment>
//     Certificate Name <Input /> <Button>Add</Button>
//   </Segment>
// );

class EditExperience extends Component {
  state = { cert_state: "Validate", swarmId: "", category: "Experience" };

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
      "http://localhost:4000/changeExperienceState/" + this.state.swarmId;
    console.log(url);

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
  onClickValidate = () => {
    //adding data to validation_requests table
    // var url = "http://localhost:4000/Validation";
    // fetch(url, {
    //   method: "POST", // or 'PUT'
    //   mode: "cors",
    //   body: JSON.stringify({
    //     swarm_id: this.state.swarmId,
    //     category: "Experience"
    //   }), // data can be `string` or {object}!
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(res => res.body)
    //   .then(response => console.log("Success:", JSON.stringify(response)))
    //   .catch(error => console.error("Error:", error));

    this.changeStatus();
  };

  onClickDelete = () => {
    var url = "http://localhost:4000/DeleteExperience";

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

            <h3>{this.props.jobtitle}</h3>
            <h3>{this.props.org}</h3>
            <h4>From {this.props.from}</h4>
            <h4>To {this.props.to}</h4>
            <h5>{this.props.desc}</h5>
            <h5>{this.props.expiry}</h5>
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

export default Experience;

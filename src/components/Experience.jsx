import React, { Component } from "react";
import {
  Button,
  Grid,
  Image,
  Segment,
  Label,
  Modal,
  Step,
  Header,
  Icon,
  Input
} from "semantic-ui-react";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificate_name: "",
      _status: "Validate",
      sender: "dj1",
      certs: []
    };
  }

  componentDidMount() {
    this.fetchCertificates();
  }

  fetchCertificates = () => {
    var url = "http://localhost:4000/certis/" + this.state.sender;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ certs: response.data }))
      .catch(err => console.log(err));
  };

  handleClick = e => {
    e.preventDefault();

    var url = "http://localhost:4000/certificate";

    fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        certiname: this.state.certificate_name,
        sentby: this.state.sender,
        status: this.state._status
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));

    this.fetchCertificates();
  };

  handleChange = e => {
    this.setState({ certificate_name: e.target.value });
  };

  render() {
    return (
      <Segment size="large" style={{ marginTop: 50 }}>
        <Modal trigger={<Button>Add Experience</Button>} closeIcon>
          <Segment>
            <div>
              Certificate Name
              <input
                value={this.state.certificate_name}
                onChange={this.handleChange}
              />{" "}
              <Button onClick={this.handleClick}>Add</Button>
            </div>
          </Segment>
        </Modal>
        {this.state.certs.map((listItem, i) => (
          <EditExperience
            key={i}
            content={listItem.certiname}
            sender={listItem.sentby}
            c_state={listItem.status}
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
  state = { cert_state: "Validate" };

  //check from database
  componentDidMount() {
    this.setState({ cert_state: this.props.c_state });
  }
  //changes status to pending, disables the button
  onClickValidate = () => {
    this.setState({ cert_state: "pending" });
    var url = "http://localhost:4000/validation";

    fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        cert: this.props.content,
        stat: "pending"
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  onClickDelete = () => {
    var url = "http://localhost:4000/validation";

    fetch(url, {
      method: "DELETE", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        cert: this.props.content
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
    const { cert_state } = this.state;
    return (
      <Segment>
        <Grid>
          <Grid.Column width={11}>
            <Modal
              trigger={
                <Label as="a" attached="top right" icon="edit outline" />
              }
            >
              <DocUpload />
            </Modal>
            <h3>Content </h3>
            <h3>{this.props.content}</h3>
            <Button
              onClick={this.onClickValidate}
              primary
              disabled={cert_state !== "Validate"}
            >
              {cert_state}
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
              <Step completed={cert_state !== "Validate"}>Requested</Step>
              <Step disabled completed={cert_state === "done"}>
                Validated
              </Step>
            </Step.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

const DocUpload = () => (
  <Segment placeholder>
    <div>
      <Header icon>
        <Icon name="pdf file outline" />
        No documents are listed for this customer.
      </Header>
    </div>
    <div>
      <Button primary>Add Document</Button>
    </div>
  </Segment>
);

export default Experience;

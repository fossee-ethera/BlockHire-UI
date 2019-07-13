//this page is the home page for company,,,this page contrain profile of company
import React, { Component } from "react";
import "../styles/EditProfilePage.css";
import {
  Button,
  Modal,
  Form,
  Container,
  Grid,
  Image,
  Segment,
  Label,
  Dropdown
} from "semantic-ui-react";

var global;

class EditProfilePage extends Component {
  state = {
    about: []
  };
  async componentDidMount() {
    await this.getUserInfo();
  }
  //function for getting the company info from mysql
  getUserInfo = _ => {
    //  var url = "http://localhost:4000/Company/" + this.props.location.state[0].wallet_add;
    var url =
      "http://localhost:4000/Company/" + sessionStorage.getItem("LoggedUser");
    fetch(url)
      .then(response => response.json())
      .then(response =>
        this.setState({
          about: response.data
        })
      )
      .then(() => this.setState({}))
      .catch(err => console.log(err));
    console.log(this.state.about);
  };

  render() {
    if (this.state.about.length == 0) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    } else {
      //    this.state.about[0].wallet_add = this.props.location.state[0].wallet_add;
      return (
        <div>
          <Container>
            <AboutContainer passed={this.state.about} />
          </Container>
        </div>
      );
    }
  }
}
//this part is for editing the company infor
class AboutContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.passed[0].name,
      email_id: this.props.passed[0].email_id,
      description: this.props.passed[0].description,
      website: this.props.passed[0].website,
      industry: this.props.passed[0].industry,
      hq: this.props.passed[0].hq,
      wallet_add: this.props.passed[0].wallet_add
    };
    console.log("Yeh hai state");
    console.log(this.state);
    global = this.props.passed[0];
  }

  onRegisterClick = e => {
    e.preventDefault();

    console.log("Wallet Address");
    console.log(this.state.wallet_add);
    global = this.state;
    this.setState({});

    console.log("yeh global variable hai");
    console.log(global);
    //  var url = "http://localhost:4000/EditCompany/" + this.state.wallet_add;
    var url =
      "http://localhost:4000/EditCompany/" +
      sessionStorage.getItem("LoggedUser");
    fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        // company_id: this.state.wallet_add,
        name: this.state.name,
        email_id: this.state.email_id,
        description: this.state.description,
        website: this.state.website,
        industry: this.state.industry,
        hq: this.state.hq
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Segment size="large" style={{ marginTop: 100 }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            </Grid.Column>
            <Grid.Column width={12}>
              <Label size="massive">{global.name} </Label>

              <h3>
                {" "}
                <Label size="big">About Us</Label>
              </h3>
              <h5>{global.description}</h5>
              <Modal
                //onClose={this.setState({})}
                trigger={
                  <Label as="a" attached="top right" icon="edit outline" />
                }
              >
                <Form size="large">
                  <Form.Input
                    required
                    fluid
                    type="text"
                    name="name"
                    value={this.state.name}
                    icon="user"
                    iconPosition="left"
                    placeholder="Company Name"
                    onChange={this.onHandleChange}
                  />
                  <Form.TextArea
                    style={{ minHeight: 150 }}
                    type="text"
                    name="description"
                    value={this.state.description}
                    required
                    placeholder="Description"
                    onChange={this.onHandleChange}
                  />
                  <Form.Input
                    required
                    fluid
                    type="text"
                    name="hq"
                    value={this.state.hq}
                    icon="location arrow"
                    iconPosition="left"
                    placeholder="Head Quarters"
                    onChange={this.onHandleChange}
                  />
                  <Form.Input
                    required
                    type="url"
                    fluid
                    name="website"
                    icon="user"
                    value={this.state.website}
                    iconPosition="left"
                    placeholder="website"
                    onChange={this.onHandleChange}
                  />
                  <Form.Input
                    required
                    type="email"
                    fluid
                    name="email_id"
                    value={this.state.email_id}
                    icon="envelope"
                    iconPosition="left"
                    placeholder="email-id"
                    onChange={this.onHandleChange}
                  />
                  <Form.Input
                    required
                    type="text"
                    fluid
                    name="industry"
                    value={this.state.industry}
                    iconPosition="left"
                    placeholder="industry"
                    onChange={this.onHandleChange}
                  />

                  <Button
                    onClick={this.onRegisterClick}
                    color="green"
                    fluid
                    size="large"
                  >
                    Save
                  </Button>
                </Form>
              </Modal>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4} />
            <Grid.Column width={6}>
              <h4>
                <Label size="large">Email id</Label>
              </h4>
              <h5>{this.state.email_id}</h5>
            </Grid.Column>
            <Grid.Column width={6}>
              <h4>
                <Label size="large">Website</Label>
              </h4>
              <h5>{global.website}</h5>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4} />
            <Grid.Column width={6}>
              <h4>
                <Label size="large">Head-Quarters</Label>
              </h4>
              <h5>{global.hq}</h5>
            </Grid.Column>
            <Grid.Column width={6}>
              <h4>
                <Label size="large">Industry</Label>
              </h4>
              <h5>{global.industry}</h5>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default EditProfilePage;

import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Image,
  Segment,
  Label,
  Dropdown
} from "semantic-ui-react";

export default class EditAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "https://react.semantic-ui.com/images/avatar/large/rachel.png",
      fname: this.props.pass.first_name,
      lname: this.props.pass.last_name,
      bio: this.props.pass.about,
      skills: this.props.pass.skills
    };
    this.inputOpenFileRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }
  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };
  handleChange(event) {
    console.log(event.target.files[0]);
    if (event.target.files[0] !== "undefined") {
      this.setState({
        file: URL.createObjectURL(event.target.files[0])
      });
    }
  }

  onlogChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSaveEdit = async e => {
    //update in backend
    var url =
      "http://localhost:4000/EditAboutUser/" +
      sessionStorage.getItem("LoggedUser");
    console.log(url);

    await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        first_name: this.state.fname,
        last_name: this.state.lname,
        about: this.state.bio,
        skills: this.state.skills
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));

    window.location.reload();
  };

  render() {
    return (
      <Segment size="large">
        <Form>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column width={4}>
                <input
                  type="file"
                  className="inputfile"
                  onChange={this.handleChange}
                  ref={this.inputOpenFileRef}
                  style={{ display: "none" }}
                />

                <Image
                  circular
                  fluid
                  src={this.state.file}
                  onClick={this.showOpenFileDlg}
                />
              </Grid.Column>
              <Grid.Column width={7}>
                <Form.Input
                  label="First Name"
                  onChange={this.onlogChange}
                  value={this.state.fname}
                  name="fname"
                />{" "}
                <Form.Input
                  label="Last Name"
                  onChange={this.onlogChange}
                  value={this.state.lname}
                  name="lname"
                />{" "}
                <Form.Input
                  label="Skills"
                  onChange={this.onlogChange}
                  value={this.state.skills}
                  name="skills"
                />{" "}
              </Grid.Column>
              <Grid.Column width={5}>
                <Form.TextArea
                  label="About"
                  onChange={this.onlogChange}
                  value={this.state.bio}
                  name="bio"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                {/* <button>Save</button> */}
                <Button onClick={this.onSaveEdit} fluid>
                  Save Edits
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

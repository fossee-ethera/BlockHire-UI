import React, { Component } from "react";
import "../styles/EditProfilePage.css";
import {
  Button,
  Container,
  Grid,
  Image,
  Segment,
  Label,
  Dropdown,
  Modal
} from "semantic-ui-react";
import Experience from "./Experience";
import Education from "./Education";
import EditAbout from "./EditAbout";

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: []
    };
  }

  async componentDidMount() {
    console.log(sessionStorage.getItem("LoggedUser"));
    await this.getUserInfo();
  }

  getUserInfo = _ => {
    console.log("Session user");
    console.log(sessionStorage.getItem("getUser"));

    var url =
      // "http://localhost:4000/About/" + this.props.location.state[0].wallet_add;
      "http://localhost:4000/About/" + sessionStorage.getItem("LoggedUser");
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ about: response.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Container>
          <AboutContainer passed={this.state.about} />
          <AddSectionToProfile />
          {/* <Experience id={this.props.location.state[0].wallet_add} /> */}
          <Experience />
          <Education />
        </Container>
      </div>
    );
  }
}

class AboutContainer extends Component {
  render() {
    return (
      <Segment size="large" style={{ marginTop: 100 }}>
        <Grid>
          <Grid.Column width={4}>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column width={12}>
            {this.props.passed.map((user, i) => (
              <div key={i}>
                <h3>
                  {user.first_name} {user.last_name}{" "}
                </h3>
                <h3>{user.about}</h3>
                <h3>{user.skills}</h3>
              </div>
            ))}
            <Modal
              trigger={
                <Label as="a" attached="top right" icon="edit outline" />
              }
            >
              <EditAbout pass={this.props.passed[0]} />
            </Modal>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

const AddSectionToProfile = () => (
  <Segment size="large" style={{ marginTop: 50 }}>
    <Button primary size="large">
      {" "}
      Add Profile Sections
      <Dropdown>
        <Dropdown.Menu>
          <Dropdown.Item>Achievements</Dropdown.Item>
          <Dropdown.Item>Projects</Dropdown.Item>
          <Dropdown.Item>Volunteering Experience</Dropdown.Item>
          <Dropdown.Item>Interests</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Button>
  </Segment>
);

export default EditProfilePage;

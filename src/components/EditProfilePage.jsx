import React, { Component } from "react";
import "./styles/EditProfilePage.css";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Card,
  Menu,
  Responsive,
  Segment,
  Label,
  Visibility,
  Dropdown
} from "semantic-ui-react";
import TopBar from "./TopBar";
import ProfileSections from "./ProfileSections";

class EditProfilePage extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Container>
          <AboutContainer />
          <AddSectionToProfile />
          <ProfileSections />
        </Container>
      </div>
    );
  }
}

class AboutContainer extends Component {
  state = {
    about: []
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = _ => {
    fetch("http://localhost:4000")
      .then(response => response.json())
      .then(response => this.setState({ about: response.data }))
      .catch(err => console.log(err));
  };

  renderUser = ({ user_id, firstname, lastname, bio, location }) => (
    <div key={user_id}>
      <h2>
        {firstname} {lastname}{" "}
      </h2>
      <h3>{bio}</h3>
      <h3>{location}</h3>
    </div>
  );

  render() {
    const { about } = this.state;
    return (
      <Segment size="large" style={{ marginTop: 50 }}>
        <Grid>
          <Grid.Column width={4}>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column width={12}>
            <div>{about.map(this.renderUser)}</div>
            <Label as="a" attached="top right" icon="edit outline" />
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

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
  state = {};
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

const AboutContainer = () => (
  <Segment size="large" style={{ marginTop: 50 }}>
    <Grid>
      <Grid.Column width={4}>
        <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
      </Grid.Column>
      <Grid.Column width={9}>
        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
      </Grid.Column>
      <Grid.Column width={3}>
        <Label as="a" attached="top right" icon>
          <Icon name="edit outline" />
        </Label>
        <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
      </Grid.Column>
    </Grid>
  </Segment>
);

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

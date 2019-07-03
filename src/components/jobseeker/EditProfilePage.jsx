import React, { Component } from "react";
import "../styles/EditProfilePage.css";
import {
  Button,
  Container,
  Grid,
  Image,
  Segment,
  Label,
  Dropdown
} from "semantic-ui-react";
import Experience from "./Experience";
import Education from "./Education";

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: []
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = _ => {
    fetch("http://localhost:4000")
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
          <Experience name={this.state.about["0"]} />
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
                  {user.firstname} {user.lastname}{" "}
                </h3>
                <h3>{user.bio}</h3>
                <h3>{user.location}</h3>
              </div>
            ))}
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

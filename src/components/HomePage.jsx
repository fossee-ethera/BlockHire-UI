import React, { Component } from "react";
import "./styles/HomePage.css";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

const square = { width: 250, height: 250 };

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class HomePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <header className="App-header">
          <Container text>
            <Header>
              <h1>BlockHire</h1>
              <h2>Sign In as</h2>
            </Header>
          </Container>
          <div className="circles">
            <div className="circle-one">
              <Segment circular style={square}>
                <HeaderUserSignIn />
              </Segment>
            </div>
            <div className="circle-two">
              <Segment circular style={square}>
                <HeaderCompanySignIn />
              </Segment>
            </div>
          </div>
        </header>
        <div>
          <AddExtraContent />

          <HeaderFooter />
        </div>
      </div>
    );
  }
}

const HeaderUserSignIn = () => (
  <Header as="h2" icon>
    <Icon name="user" />
    <Header.Subheader style={{ fontSize: 18 }}>
      Looking for jobs?
    </Header.Subheader>
    <Button primary>Job Seeker</Button>
  </Header>
);

const HeaderCompanySignIn = () => (
  <Header as="h2" icon>
    <Icon name="graduation cap" />
    <Header.Subheader style={{ fontSize: 18 }}>
      Are you a Validator?
    </Header.Subheader>
    <Button primary>Company</Button>
  </Header>
);

const AddExtraContent = () => <div className="content">Add Content Here</div>;

const HeaderFooter = () => (
  <div className="footer">
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Religious Ceremonies</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h4" inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
);

export default HomePage;

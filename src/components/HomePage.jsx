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
import { withRouter } from "react-router-dom";
import Portis from "@portis/web3";
import Web3 from "web3";

const square = { width: 250, height: 250 };

const portis = new Portis("61f1e9b2-488e-4a59-a3e3-24e855799d8d", "ropsten");
const web3 = new Web3(portis.provider);

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const Button1 = withRouter(({ history }) => (
  <Button
    primary
    type="button"
    onClick={async () => {
      var candidateAddress = await portis.provider.enable();
      if (candidateAddress.length > 0) history.push("/JobSeekerRegistration");
      //}
      //return result;
    }}
  >
    Job Seeker
  </Button>
));

const Button2 = withRouter(({ history }) => (
  <Button
    primary
    type="button"
    onClick={async () => {
      var companyAddress = await portis.provider.enable();
      if (companyAddress.length > 0) history.push("/CompanyRegistration");
      //}
      //return result;
    }}
  >
    Job Seeker
  </Button>
));

class HomePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <header className="App-header">
          <Container text>
            <Header>
              <h1>Geth-Hired</h1>
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
    <Button1 />
  </Header>
);

const HeaderCompanySignIn = () => (
  <Header as="h2" icon>
    <Icon name="graduation cap" />
    <Header.Subheader style={{ fontSize: 18 }}>
      Are you a Validator?
    </Header.Subheader>
    <Button2 />
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

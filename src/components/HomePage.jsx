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

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet_add: "",
      category: ""
    };
  }

  onHandleClick(text, name) {
    console.log("wallet...............");
    console.log(text);
    this.setState({
      wallet_add: text
    });
    var num;
    var url = "http://localhost:4000/Category/" + text;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log(response.data);
        num = response.data.length;
        if (num > 0) {
          name = response.data[0].category;
        }
        this.setState({
          category: name
        });

        if (num == 0) {
          var url = "http://localhost:4000/Category";

          fetch(url, {
            method: "POST", // or 'PUT'
            mode: "cors",
            body: JSON.stringify({
              wallet_address: this.state.wallet_add,
              category: name
            }), // data can be `string` or {object}!
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => res.body)
            .then(response => console.log("Success:", JSON.stringify(response)))
            .catch(error => console.error("Error:", error));
          if (name === "JobSeeker") {
            this.props.history.push(
              "/JobSeekerRegistration",
              //{},
              [this.state]
            );
          } else {
            this.props.history.push(
              "/CompanyRegistration",
              //{},
              [this.state]
            );
          }
        } else {
          if (name === "JobSeeker") {
            this.props.history.replace(
              "/jobseeker/profile",
              //{},
              [this.state]
            );
          } else {
            this.props.history.replace(
              "/company/profile",
              //{},
              [this.state]
            );
          }
        }
      })
      .catch(err => console.log(err));
  }

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
                <Header as="h2" icon>
                  <Icon name="user" />
                  <Header.Subheader style={{ fontSize: 18 }}>
                    Looking for jobs?
                  </Header.Subheader>
                  <Button
                    primary
                    type="button"
                    onClick={async () => {
                      var candidateAddress = await portis.provider.enable();
                      console.log(candidateAddress[0]);
                      sessionStorage.setItem("LoggedUser", candidateAddress[0]);
                      if (candidateAddress.length > 0) {
                        this.onHandleClick(
                          String(candidateAddress[0]),
                          "JobSeeker"
                        );
                        // this.props.history.push(
                        //   "/JobSeekerRegistration",
                        //   //{},
                        //   [this.state]
                        // );
                      }
                    }}
                  >
                    Job Seeker
                  </Button>
                </Header>
              </Segment>
            </div>
            <div className="circle-two">
              <Segment circular style={square}>
                <Header as="h2" icon>
                  <Icon name="graduation cap" />
                  <Header.Subheader style={{ fontSize: 18 }}>
                    Are you a Validator?
                  </Header.Subheader>
                  <Button
                    primary
                    type="button"
                    onClick={async () => {
                      var companyAddress = await portis.provider.enable();
                      console.log(companyAddress);
                      sessionStorage.setItem("LoggedUser", companyAddress[0]);
                      if (companyAddress.length > 0) {
                        this.onHandleClick(
                          String(companyAddress[0]),
                          "Company"
                        );
                        // withRouter(({ history, location }) =>
                        //   this.props.history.push(
                        //     "/CompanyRegistration",
                        //     location.state
                        //   )
                        // );
                      }
                    }}
                  >
                    Company
                  </Button>
                </Header>
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

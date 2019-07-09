import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Menu,
  Dropdown,
  Search,
  Grid,
  Modal,
  Label,
  Segment
} from "semantic-ui-react";
import Web3 from "web3";
import Portis from "@portis/web3";

import token from "../Abis";

const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");
const web3 = new Web3(portis.provider);
var balance;
class TopBar extends Component {
  state = {
    activeItem: "profile",
    tokens: ""
  };
  state = { activeItem: "profile" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  async componentDidMount() {
    const bal = await token.methods
      .balanceOf(String(sessionStorage.getItem("LoggedUser")))
      .call();
    balance = bal.toNumber();
    this.setState({ tokens: balance });
  }
  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted fixed="top" size="huge">
        <Menu.Menu position="left" style={{ marginLeft: 150 }}>
          <Menu.Item>
            {" "}
            <h2>Geth-Hired</h2>
          </Menu.Item>
          <Menu.Item>
            {" "}
            <SearchBar />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right" style={{ marginRight: 150 }}>
          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={this.handleItemClick}
            as={Link}
            to="/company/profile"
          />
          <Menu.Item
            name="jobs"
            active={activeItem === "jobs"}
            onClick={this.handleItemClick}
            as={Link}
            to="/jobs"
          />
          <Menu.Item
            name="validation"
            active={activeItem === "validation"}
            onClick={this.handleItemClick}
            as={Link}
            to="/validation"
          />
          <Menu.Item
            name="notifications"
            active={activeItem === "notifications"}
            onClick={this.handleItemClick}
            as={Link}
            to="/notifications"
          />
          <Modal
            trigger={
              <Menu.Item
                name="account"
                active={activeItem === "account"}
                onClick={this.handleItemClick}
                as={Link}
                to="/account"
              />
            }
            closeIcon
          >
            <Segment>
              <Grid.Row centered>
                <Label color="blue">Balance</Label>
                <Label color="brown">{this.state.tokens}</Label>{" "}
                <Label color="black">GH</Label>
              </Grid.Row>
            </Segment>
          </Modal>
          <Dropdown item text="Settings">
            <Dropdown.Menu>
              <Dropdown.Item>Change Password</Dropdown.Item>
              <Dropdown.Item>Manage</Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  sessionStorage.clear();

                  //this.props.history.replace("/");
                }}
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

const SearchBar = () => (
  <div className="search">
    <Search placeholder="Search" />
  </div>
);

export default withRouter(TopBar);

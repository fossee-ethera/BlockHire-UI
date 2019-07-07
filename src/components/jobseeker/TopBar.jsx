import React, { Component } from "react";
import "../styles/TopBar.css";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Search } from "semantic-ui-react";
import Portis from "@portis/web3";

const portis = new Portis("61f1e9b2-488e-4a59-a3e3-24e855799d8d", "ropsten");

class TopBar extends Component {
  state = {};
  render() {
    return (
      <div className="topbar">
        <MenuBar />
      </div>
    );
  }
}

const SearchBar = () => (
  <div className="search">
    <Search placeholder="Search" />
  </div>
);

class MenuBar extends Component {
  state = { activeItem: "profile" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted fixed="top" size="huge">
        <Menu.Menu position="left" style={{ marginLeft: 150 }}>
          <Menu.Item>
            {" "}
            <h2>BlockHire</h2>
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
            to="/jobseeker/profile"
          />
          <Menu.Item
            name="jobs"
            active={activeItem === "jobs"}
            onClick={this.handleItemClick}
            as={Link}
            to="/jobs"
          />
          <Menu.Item
            name="notifications"
            active={activeItem === "notifications"}
            onClick={this.handleItemClick}
            as={Link}
            to="/notifications"
          />
          <Menu.Item
            name="account"
            active={activeItem === "account"}
            onClick={this.handleItemClick}
            as={Link}
            to="/account"
          />
          <Dropdown item text="Settings">
            <Dropdown.Menu>
              <Dropdown.Item>Change Password</Dropdown.Item>
              <Dropdown.Item>Manage</Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  sessionStorage.clear();
                  portis.showPortis();
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

export default TopBar;

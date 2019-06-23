import React, { Component } from "react";
import "./styles/TopBar.css";
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
  Dropdown,
  Search,
  Segment,
  Sidebar,
  Visibility,
  MenuItem
} from "semantic-ui-react";

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
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted size="huge">
        <Menu.Item>
          {" "}
          <h2>BlockHire</h2>
        </Menu.Item>
        <Menu.Item>
          {" "}
          <SearchBar />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="jobs"
            active={activeItem === "jobs"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="notifications"
            active={activeItem === "notifications"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="account"
            active={activeItem === "account"}
            onClick={this.handleItemClick}
          />
          <Dropdown item text="Settings">
            <Dropdown.Menu>
              <Dropdown.Item>Change Password</Dropdown.Item>
              <Dropdown.Item>Manage</Dropdown.Item>
              <Dropdown.Item>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default TopBar;

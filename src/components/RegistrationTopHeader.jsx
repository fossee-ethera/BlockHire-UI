import React, { Component } from "react";
import "./styles/HomePageTopBar.css";

class TopHeader extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="topbar">
          <div className="alignment">
            <div />
            <div>
              <h1>Geth-Hired </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopHeader;

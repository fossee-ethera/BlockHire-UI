import React, { Component } from "react";
import Experience from "./Experience";
import Education from "./Education";

class ProfileSectionsContainer extends Component {
  state = {};
  render() {
    return (
      <div>
        <Experience />
        <Education />
      </div>
    );
  }
}

export default ProfileSectionsContainer;

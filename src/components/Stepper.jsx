import React, { Component } from "react";
import { Step } from "semantic-ui-react";

class Stepper extends Component {
  state = {};
  render() {
    return (
      <Step.Group ordered vertical>
        <Step completed>Requested</Step>
        <Step disabled>Verified</Step>
      </Step.Group>
    );
  }
}

export default Stepper;

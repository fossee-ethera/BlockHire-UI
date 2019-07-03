import React, { Component } from "react";
import {
  Button,
  Grid,
  Icon,
  Image,
  Segment,
  Label,
  Step
} from "semantic-ui-react";

class Education extends Component {
  state = {};
  render() {
    return (
      <Segment size="large" style={{ marginTop: 50 }}>
        <Button>Add Education</Button>
        <AddEducation />
      </Segment>
    );
  }
}

const AddEducation = () => (
  <Grid>
    <Grid.Column width={11}>
      <Label as="a" attached="top right" icon="edit outline" />
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </Grid.Column>
    <Grid.Column width={5}>
      <Stepper />
    </Grid.Column>
  </Grid>
);
class Stepper extends Component {
  state = {};
  render() {
    return (
      <Step.Group ordered vertical>
        <Step completed>Requested</Step>
        <Step disabled>Validated</Step>
      </Step.Group>
    );
  }
}

export default Education;

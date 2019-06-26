import React, { Component } from "react";
import { Button, Grid, Icon, Image, Segment, Label } from "semantic-ui-react";
import Stepper from "./Stepper";

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
      <Label as="a" attached="top right" icon>
        <Icon name="edit outline" />
      </Label>
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </Grid.Column>
    <Grid.Column width={5}>
      <Stepper />
    </Grid.Column>
  </Grid>
);

export default Education;

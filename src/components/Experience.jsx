import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Card,
  Step,
  Responsive,
  Segment,
  Label,
  Visibility,
  Dropdown,
  GridRow
} from "semantic-ui-react";
import Stepper from "./Stepper";

class Experience extends Component {
  state = {};
  render() {
    return (
      <Segment size="large" style={{ marginTop: 50 }}>
        <Button>Add Experience</Button>
        <AddExperience />
      </Segment>
    );
  }
}

const AddExperience = () => (
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

export default Experience;

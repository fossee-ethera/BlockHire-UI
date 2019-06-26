import React, { Component } from "react";
import { Button, Grid, Image, Segment, Label, Modal } from "semantic-ui-react";
import Stepper from "./Stepper";
import DocUpload from "./DocumentUploadModal";

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
      <Modal
        trigger={<Label as="a" attached="top right" icon="edit outline" />}
      >
        <DocUpload />
      </Modal>
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </Grid.Column>
    <Grid.Column width={5}>
      <Stepper />
    </Grid.Column>
  </Grid>
);

export default Experience;

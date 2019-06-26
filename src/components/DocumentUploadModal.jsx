import React, { Component } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

class DocUpload extends Component {
  state = {};
  render() {
    return (
      <div>
        <DocUploadSegment />
      </div>
    );
  }
}

export default DocUpload;

// const DocUploadModal = () => (
//   <Modal trigger={<Button>Show Modal</Button>}>
//     <DocUploadSegment />
//   </Modal>
// );

const DocUploadSegment = () => (
  <Segment placeholder>
    <div>
      <Header icon>
        <Icon name="pdf file outline" />
        No documents are listed for this customer.
      </Header>
    </div>
    <div>
      <Button primary>Add Document</Button>
    </div>
  </Segment>
);

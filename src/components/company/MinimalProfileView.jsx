import React, { Component } from "react";
import "../styles/EditProfilePage.css";
import {
  Button,
  Container,
  Grid,
  Image,
  Segment,
  Label,
  Dropdown,
  Modal,
  Step,
  Header,
  Icon
} from "semantic-ui-react";

class MinimalProfileView extends Component {
  constructor(props) {
    super(props);
    console.log("im minimal constructor");
    this.state = {
      user: "0x4ab372865dd07acffba20ec84c0c60ef8bf84ae0",
      about: []
    };
  }

  async componentDidMount() {
    //console.log(sessionStorage.getItem("LoggedUser"));
    //console.log(this.props.match.params.userid)
    await this.getUserInfo();
  }

  getUserInfo = _ => {
    console.log("Session user");
    //console.log(sessionStorage.getItem("getUser"));

    var url = "http://localhost:4000/About/" + this.state.user;
    // "http://localhost:4000/About/" + this.props.location.state[0].wallet_add;
    //"http://localhost:4000/About/" + this.props.match.params.userid;
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ about: response.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Container>
          <MinimalAboutContainer passed={this.state.about} />

          <MinimalExperience uid={this.state.user} />
          {/* <Experience />*/}
          <MinimalEducation uid={this.state.user} />
        </Container>
      </div>
    );
  }
}

class MinimalAboutContainer extends Component {
  render() {
    return (
      <Segment size="large" style={{ marginTop: 100 }}>
        <Grid>
          <Grid.Column width={4}>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column width={12}>
            {this.props.passed.map((user, i) => (
              <div key={i}>
                <h3>
                  {user.first_name} {user.last_name}{" "}
                </h3>
                <h3>{user.about}</h3>
                <h3>{user.skills}</h3>
              </div>
            ))}
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

class MinimalExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exp_data: []
    };
  }
  componentDidMount() {
    this.fetchCertificates();
  }

  fetchCertificates = () => {
    var url = "http://localhost:4000/Experience/" + this.props.uid;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ exp_data: response.data }))
      .catch(err => console.log(err));
    console.log(this.state.exp_data);
  };
  render() {
    return (
      <Segment size="large" style={{ marginTop: 50 }}>
        {this.state.exp_data.map((listItem, i) => (
          <EditExperience
            key={i}
            jobtitle={listItem.job_title}
            org={listItem.organisation}
            from={listItem.from}
            to={listItem.to}
            desc={listItem.description}
            c_status={listItem.status}
            expiry={listItem.expiry}
            swarmid={listItem.swarm_id}
          />
        ))}
      </Segment>
    );
  }
}

class EditExperience extends Component {
  state = { cert_state: "Validate", swarmId: "", category: "Experience" };

  //check from database
  async componentDidMount() {
    await this.setState({
      swarmId: this.props.swarmid
    });
  }

  fetchStatus = () => {
    var url = "http://localhost:4000/CertificateStatus/" + this.props.swarmid;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({ cert_state: response.data });
      })
      .catch(err => console.log(err));
  };

  //checking the ceritificate data
  onClickVerification = () => {};

  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Column width={11}>
            {/* Add edit options here */}

            <h3>{this.props.jobtitle}</h3>
            <h3>{this.props.org}</h3>
            <h4>From {this.props.from}</h4>
            <h4>To {this.props.to}</h4>
            <h5>{this.props.desc}</h5>
            <h5>{this.props.expiry}</h5>
            <Modal
              trigger={
                <Button
                  onClick={this.onClickVerification}
                  primary
                  // disabled={this.state.cert_state !== "Validated"}
                >
                  Verify
                </Button>
              }
              closeIcon
            >
              <Header icon="question circle outline" content="Sign Document" />
              <Modal.Content>
                <h3>Are you sure you want to verify this document?</h3>
                <h3>
                  *** you have pay transaction fees with additional charges for
                  certificated verification
                </h3>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.handleSignButtonClick} color="green">
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
          <Grid.Column width={5}>
            <Step.Group ordered vertical size="tiny">
              <Step completed={this.props.c_status !== "Validate"}>
                Requested
              </Step>
              <Step completed={this.props.c_status === "Done"}>Validated</Step>
            </Step.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

class MinimalEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edu_data: []
    };
  }
  componentDidMount() {
    this.fetchEducation();
  }

  fetchEducation = () => {
    var url = "http://localhost:4000/Education/" + this.props.uid;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ edu_data: response.data }))
      .catch(err => console.log(err));
    console.log(this.state.edu_data);
  };
  render() {
    return (
      <Segment size="large" style={{ marginTop: 50 }}>
        {this.state.edu_data.map((listItem, i) => (
          <EditEducation
            key={i}
            edutitle={listItem.level}
            org={listItem.institution}
            from={listItem.from}
            to={listItem.to}
            desc={listItem.description}
            c_status={listItem.status}
            swarmid={listItem.swarm_id}
            t_hash={listItem.txn_hash}
          />
        ))}
      </Segment>
    );
  }
}

class EditEducation extends Component {
  state = { cert_state: "Validate", swarmId: "", category: "Experience" };

  //check from database
  async componentDidMount() {
    await this.setState({
      swarmId: this.props.swarmid
    });
  }

  fetchStatus = () => {
    var url = "http://localhost:4000/EducationStatus/" + this.props.swarmid;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({ cert_state: response.data });
      })
      .catch(err => console.log(err));
  };

  //checking the ceritificate data
  onClickVerification = () => {};

  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Column width={11}>
            {/* Add edit options here */}

            <h3>{this.props.edutitle}</h3>
            <h3>{this.props.org}</h3>
            <h4>From {this.props.from}</h4>
            <h4>To {this.props.to}</h4>
            <h5>{this.props.desc}</h5>

            <Modal
              trigger={
                <Button
                  onClick={this.onClickVerification}
                  primary
                  // disabled={this.state.cert_state !== "Validated"}
                >
                  Verify
                </Button>
              }
              closeIcon
            >
              <Header icon="question circle outline" content="Sign Document" />
              <Modal.Content>
                <h3>Are you sure you want to verify this document?</h3>
                <h3>
                  *** you have pay transaction fees with additional charges for
                  certificated verification
                </h3>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.handleSignButtonClick} color="green">
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
          <Grid.Column width={5}>
            <Step.Group ordered vertical size="tiny">
              <Step completed={this.state.cert_state !== "Validate"}>
                Requested
              </Step>
              <Step completed={this.state.cert_state === "Done"}>
                Validated
              </Step>
            </Step.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default MinimalProfileView;

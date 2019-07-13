//this page show profile of candidate like a resume where any one can validate candidate certificates
//when he/she clicks on verfy button he/she redirect to verification page
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
import { Link, BrowserRouter, Route,Switch } from "react-router-dom";

import CertificateVerification from "./CertificateVerification";

class MinimalProfileView extends Component {
  constructor(props) {
    super(props);
    console.log("im minimal constructor");
    this.state = {
      user: this.props.match.params.user_id,
      about: []
    };
  }

  async componentDidMount() {
    await this.getUserInfo();
  }

  getUserInfo = _ => {
    console.log("Session user");
    var url = "http://localhost:4000/About/" + this.state.user;
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
            user={listItem.user_id}
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


  render() {
    return (
      <Container fluid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>
              {/* Add edit options here */}

              <h3>{this.props.jobtitle}</h3>
              <h3>{this.props.org}</h3>
              <h4>From {this.props.from}</h4>
              <h4>To {this.props.to}</h4>
              <h5>{this.props.desc}</h5>
              <h5>{this.props.expiry}</h5>

              <Button
                as={Link}
                to={`verify/${this.props.swarmid}/experience/`}
                target={"_blank"}
                primary
              // disabled={this.state.cert_state !== "Validated"}
              >
                Verify
              </Button>
            </Grid.Column>
            <Grid.Column width={5}>
              <Step.Group ordered vertical size="tiny">
                <Step completed={this.props.c_status !== "Validate"}>
                  Requested
                </Step>
                <Step completed={this.props.c_status === "Done"}>
                  Validated
                </Step>
              </Step.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <DisplayVerification />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const DisplayVerification = _ => (
  <BrowserRouter>
  <Switch>
    <Route
      path="profileview/verify/:user"
      component={CertificateVerification}
    />
    </Switch>
  </BrowserRouter>
);

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

  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>

              <h3>{this.props.jobtitle}</h3>
              <h3>{this.props.org}</h3>
              <h4>From {this.props.from}</h4>
              <h4>To {this.props.to}</h4>
              <h5>{this.props.desc}</h5>
              <h5>{this.props.expiry}</h5>

              <Button
                Link
                to="/verify"
                primary
                // disabled={this.state.cert_state !== "Validated"}
              >
                Verify
              </Button>
            </Grid.Column>
            <Grid.Column width={5}>
              <Step.Group ordered vertical size="tiny">
                <Step completed={this.props.c_status !== "Validate"}>
                  Requested
                </Step>
                <Step completed={this.props.c_status === "Done"}>
                  Validated
                </Step>
              </Step.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <DisplayVerification />
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default MinimalProfileView;
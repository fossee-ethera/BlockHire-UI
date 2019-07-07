import React, { Component } from "react";
import {
  Label,
  Button,
  List,
  Item,
  Form,
  Grid,
  Header,
  Input,
  Image,
  Message,
  Segment,
  Container,
  Divider,
  Modal,
  Card,
  CardHeader,
  CardContent
} from "semantic-ui-react";

class Jobs extends Component {
  state = {
    jobpostlist: [],
    jobCandidateList: []
  };

  async componentDidMount() {
    await this.getJobInfo();
  }

  getJobInfo = async _ => {
    console.log("yeh sessin storage");
    console.log(sessionStorage.getItem("LoggedUser"));

    //  var url = "http://localhost:4000/Company/" + this.props.location.state[0].wallet_add;
    var url =
      "http://localhost:4000/Company/Jobs/" +
      sessionStorage.getItem("LoggedUser");
    fetch(url)
      .then(response => response.json())
      .then(response =>
        this.setState({
          jobpostlist: response.data
        })
      )
      .then(() => {
        console.log("yeh hai jobpostlist");
        console.log(this.state.jobpostlist);
        this.setState({});
      })
      .catch(err => console.log(err));
  };

  getJobApplications = _ => {
    var url = "http://localhost:4000/CompanyJobs/CandidatesForJob";
    fetch(url)
      .then(response => response.json())
      .then(response =>
        this.setState({
          jobCandidateList: response.data
        })
      )
      .then(() => {
        console.log("yeh hai jobcandidate");
        console.log(this.state.jobCandidateList);
      })
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.jobpostlist.length == 0) {
      return (
        <div>
          <h3>Loading</h3>
        </div>
      );
    } else {
      //    this.state.about[0].wallet_add = this.props.location.state[0].wallet_add;
      return (
        <Container text>
          <div style={{ marginTop: 100 }}>
            {/* <Item.Group divided> */}
            {this.state.jobpostlist.map(job => (
              <Segment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <Label color="green">Job Id: {job.id}</Label>
                    </Grid.Column>
                    <Grid.Column width={6} centered>
                      <Modal
                        trigger={
                          <Button
                            color="red"
                            onClick={async () => {
                              await this.getJobApplications();
                            }}
                          >
                            Candidates Applied
                          </Button>
                        }
                      >
                        <Segment>
                          {this.state.jobCandidateList
                            .filter(el => el.job_id === job.id)
                            .map(Candidate => (
                              <List key={job.id}>
                                {Candidate.first_name} {Candidate.last_name}
                                {Candidate.status}
                              </List>
                            ))}
                        </Segment>
                      </Modal>
                    </Grid.Column>
                    <Grid.Column width={5} textAlign="right">
                      <Label color="green"> {job.designation}</Label>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider />

                  <Grid.Row centered>
                    <h2>
                      {" "}
                      <Label size="big" color="blue">
                        Description
                      </Label>
                    </h2>
                  </Grid.Row>
                  <Grid.Row centered>{job.description}</Grid.Row>
                  <Divider />

                  <Grid.Row>
                    <Grid.Column width={8}>
                      <Label color="teal">Industry:</Label> {job.industry}{" "}
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Label color="teal">Type:</Label> {job.type}{" "}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <Label color="teal">Salary:</Label> {job.salary}{" "}
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Label color="teal">Duration:</Label> {job.duration}{" "}
                    </Grid.Column>
                  </Grid.Row>
                  <Divider fitted />

                  <Grid.Row centered>
                    <h3>
                      <Label color="blue">Desired Skills:</Label>
                    </h3>
                  </Grid.Row>
                  <Grid.Row centered>{job.skills}</Grid.Row>
                </Grid>
              </Segment>
            ))}
            {/* </Item.Group> */}
          </div>
        </Container>
      );
    }
  }
}

export default Jobs;

{
  /* <Item> 
<Item.Content verticalAlign="top">
  <Item.Header>
    <b>Job Title:</b> {job.designation}
    <br />
  </Item.Header>
  <Item.Description>
    <p />
    <b>Job ID:</b> {job.id}
    <br />
    <b>Industry:</b> {job.industry}
    <br />
    <b>Job Type:</b> {job.type}
    <br />
    <b>Salary:</b> {job.salary}
    <br />
    <b>Duration:</b> {job.duration}
    <br />
    <b>Job Description:</b> {job.description}
    <br />
    <b>Desired Skills and Responsibilities:</b> {job.skills}
    <br />
  </Item.Description>
  <Item.Extra>
    <Button primary
    onClick={
      
    }
    >
      Show Applied Candidates</Button>
  </Item.Extra>
</Item.Content>
  </Item>*/
}

//this page show job and allow to post jobs
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

import ModalExampleScrollingContent from "./JobModal";

import token from "../Abis";
import Portis from "@portis/web3";
import Web3 from "web3";
const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");
const web3 = new Web3(portis.provider);

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

  shortlist = async (c, id) => {
    if (c.status === "Applied") {
      c.status = "Shortlisted";
    } else {
      c.status = "Applied";
    }
    this.setState({});

    var url = "http://localhost:4000/ChangeJobStatus/" + c.candidate_id;
    await fetch(url, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify({
        status: c.status,
        job_id: id
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  render() {
    if (this.state.jobpostlist.length == 0) {
      return (
        <div>
          <h1>Loading</h1>
          <Modal
            trigger={
              <Button
                onClick={async () => {
                  await token.methods
                    .approve1(
                      sessionStorage.getItem("LoggedUser"),
                      "0x27f2186329adB37458685C27E2DeB176ACFbc4f2",
                      100
                    )
                    .send({ from: sessionStorage.getItem("LoggedUser") })
                    .on("transactionHash", function(hash) {
                      console.log(hash);
                    });
                }}
              >
                Post Job
              </Button>
            }
            closeIcon
          >
            <ModalExampleScrollingContent />
          </Modal>
        </div>
      );
    } else {
      //    this.state.about[0].wallet_add = this.props.location.state[0].wallet_add;
      return (
        <div>
          <h1>Fossee</h1>
          <Modal
            trigger={
              <Button
                onClick={async () => {
                  await token.methods
                    .approve1(
                      sessionStorage.getItem("LoggedUser"),
                      "0x27f2186329adB37458685C27E2DeB176ACFbc4f2",
                      100
                    )
                    .send({ from: sessionStorage.getItem("LoggedUser") })
                    .on("transactionHash", function(hash) {
                      console.log(hash);
                    });
                }}
              >
                Post Job
              </Button>
            }
            closeIcon
          >
            <ModalExampleScrollingContent />
          </Modal>
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
                      <Grid.Column width={6}>
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
                            <List>
                              {this.state.jobCandidateList
                                .filter(el => el.job_id === job.id)
                                .map(Candidate => (
                                  <List.Item key={job.id}>
                                    <List.Header
                                      as="a"
                                      href={
                                        "/profileview/" + Candidate.candidate_id
                                      }
                                      target="_blank"
                                    >
                                      {Candidate.first_name}{" "}
                                      {Candidate.last_name}
                                    </List.Header>

                                    <List.Description>
                                      <Button
                                        floated="right"
                                        onClick={async () => {
                                          return window.confirm(
                                            "Are you sure you want to shortlist ?"
                                          )
                                            ? await this.shortlist(
                                                Candidate,
                                                job.id
                                              )
                                            : false;
                                        }}
                                        disabled={
                                          Candidate.status === "Shortlisted"
                                        }
                                      >
                                        Short list
                                      </Button>
                                    </List.Description>
                                  </List.Item>
                                ))}
                            </List>
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
        </div>
      );
    }
  }
}

export default Jobs;

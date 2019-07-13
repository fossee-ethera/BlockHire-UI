//this model used for posting jobs
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';

import Portis from "@portis/web3";
import Web3 from "web3";

import token from '../Abis'
const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");
const web3 = new Web3(portis.provider);



const ModalExampleScrollingContent = () => (
  <Segment>
    < FormExampleSubcomponentControl />
  </Segment>
)


const options = [
  { key: 'f', text: 'Full-Time', value: 'fulltime' },
  { key: 'r', text: 'Remote (Work from Home)', value: 'remote' },
  { key: 'i', text: 'Intern', value: 'intern' },
]

const industry = [
  { key: 'IT', text: 'IT', value: 'it' },
  { key: 'Mechanical', text: 'Mechanical', value: 'mech' },
  { key: 'Electrical', text: 'Electrical', value: 'elec' },
]

class FormExampleSubcomponentControl extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    JobTitle: '',
    Industry: '',
    JobType: '',
    Salary: '',
    Duration: '',
    JobDescription: '',
    Skills: '',
    Experience: ''
  };
  // this.handleSubmit = this.handleSubmit.bind(this);
  //this.logChange = this.logChange.bind(this);

//this functino save the job details in jobs table
  handleSubmit = event => {
    event.preventDefault();
    var url = "http://localhost:4000/JobPost";

    fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      body: JSON.stringify({
        designation: this.state.JobTitle,
        industry: this.state.Industry,
        type: this.state.JobType,
        salary: this.state.Salary,
        duration: this.state.Duration,
        description: this.state.JobDescription,
        skills: this.state.Skills,
        experience: this.state.Experience,
        company_id: sessionStorage.getItem('LoggedUser')
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.body)
      .then(response => console.log("Success:", JSON.stringify(response)))
      .then(token.methods.transferFrom1(sessionStorage.getItem("LoggedUser"), '0x27f2186329adB37458685C27E2DeB176ACFbc4f2', 100).send({ from: sessionStorage.getItem("LoggedUser") }))
      .catch(error => console.error("Error:", error));

  };
  logChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <Form method="POST">
        <Form.Group widths='equal'>
          <Form.Input fluid label='JobTitle' name='JobTitle' value={this.state.JobTitle} placeholder='Job Title' onChange={this.logChange} required />
          <Form.Select fluid label='Industry' name='Industry' options={industry} selection onChange={(e, { value }) => this.state.Industry = value} required />
          <Form.Select fluid label='JobType' name='JobType' selection options={options} onChange={(e, { value }) => this.state.JobType = value} required />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Salary' name='Salary' value={this.state.Salary} placeholder='Salary' onChange={this.logChange} required />
          <Form.Input fluid label='Duration' name='Duration' value={this.state.Duration} placeholder='Duration' onChange={this.logChange} required />
          <Form.Input fluid label='Experience' name='Experience' value={this.state.Experience} placeholder='Experience' onChange={this.logChange} required />
        </Form.Group>
        <Form.TextArea label='JobDescription' name='JobDescription' value={this.state.JobDescription} placeholder='Detailed Description of Job goes here' onChange={this.logChange} required />
        <Form.TextArea label='Skills' name='Skills' value={this.state.Skills} placeholder='Skills and Responsibilities associated with Job' onChange={this.logChange} required />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Button onClick={this.handleSubmit} primary>Proceed <Icon name='chevron black' />
        </Button>

      </Form>
    )
  }
}
export default ModalExampleScrollingContent
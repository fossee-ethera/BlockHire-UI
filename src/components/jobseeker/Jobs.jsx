import React, { Component } from "react";
import { Button, Image, Item, Container, Segment, Grid, Label,Divider, } from 'semantic-ui-react';
import token from '../Abis'
import Portis from "@portis/web3";
import Web3 from "web3";
const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");
const web3 = new Web3(portis.provider);

class Jobs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],
            wallet_add : '',
        }
    }

    

    async componentDidMount() {
      await this.setState({
        //  wallet_add: this.props.location.state[0].wallet_add
        wallet_add: sessionStorage.getItem("LoggedUser"),
        account: sessionStorage.getItem("LoggedUser"),token
       

        
      });
      

      console.log("++++++++++++++++++",this.state.wallet_add);

        this.getJobInfo();


        await token.methods.approve1(String(sessionStorage.getItem("LoggedUser")),'0x27f2186329adB37458685C27E2DeB176ACFbc4f2',50).send({from:sessionStorage.getItem("LoggedUser")})
      .on('transactionHash', function(hash){console.log(hash)});
      }
    //for showing jobs
      getJobInfo = _ => {
        fetch("http://localhost:4000/jobscandidate")
          .then(res => res.json())
          .then(res => this.setState({ jobs: res.data }))
          .catch("***********************Yeh Hai Error",err => console.log(err));
      };

      

       handleEdit= id =>async event =>  {
      
        

         //Apply Job functionality
        event.preventDefault()
        var url = "http://localhost:4000/applyjob";
        
        var data = {
            job_id: id,
            candidate_id: this.state.wallet_add,
            status:"Applied"
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            
        })
        .then(token.methods.transferFrom1(String(sessionStorage.getItem("LoggedUser")),'0x27f2186329adB37458685C27E2DeB176ACFbc4f2',50).send({from:sessionStorage.getItem("LoggedUser")})
        .on('transactionHash', function(hash){console.log(hash)}))
        .catch(function(err) {
            console.log("--------------------",err)
        });
    }




    render() {
       
        return (
        <div className="container"> 
                <Container text>
          <div style={{ marginTop: 100 }}>
              <Grid.Row centered>
                    <h2>
                      {" "}
                      <Label size="big" color="blue">
                      Jobs Available
                      </Label>
                    </h2>
                  </Grid.Row>
            {/* <Item.Group divided> */}
            {this.state.jobs.map(job => (
              <Segment>
                <Grid>
                  <Grid.Row>
                  <Grid.Column width={8} textAlign='center' >
                    <Label size="big" color="red"> {job.name}</Label>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign="center">
                      <Label size="big" color="green"> {job.designation}</Label>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider />

                  <Grid.Row centered>
                    
                      
                      <Label color="blue">
                        Description
                      </Label>
                   
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
                  <Grid.Row centered><Button  color='black' disabled ={job.status==="Applied"} floated='right' onClick={this.handleEdit(job.id)} >Apply for Job</Button></Grid.Row>

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




export default Jobs;
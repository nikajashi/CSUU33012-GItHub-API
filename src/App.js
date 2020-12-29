import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import LoginForm from './LoginForm.js';

const octokit = require('@octokit/rest')()

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submit: false,
      userInfo: '',
      repoData: '',
    };
    console.log(this.props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }

    handleSubmit(event) {
      event.preventDefault();
      console.log("Trying to log in with username:", this.state.username, "Password:", this.state.password);
      console.log("Attempting to log in with username:", this.state.username, "Password:", this.state.password);
      octokit.authenticate({username: this.state.username, password: this.state.password, type:'basic'});
    
      octokit.users.getAuthenticated().then(result => {
        this.setState({userInfo: result.data});
        console.log("User Info",this.state.userInfo);
  
      octokit.repos.list().then(result => {
        this.setState({repoData: result.data});
        console.log("Repo data", this.state.repoData);});
  
        this.setState({submit:true});
  
      });
    
    }


    handleChanges(event) {
      if(event.target.name==="username"){
        this.setState({username: event.target.value});
      }
      else if(event.target.name === "password"){
        this.setState({password: event.target.value});
      }
      else{
        console.log('Attempting to update:',event.target.name,'to',event.target.value);
      }
    }

  render() {
    return (
      <div>   
          {this.state.submit ? (
          <Dashboard info={this.state.userInfo}/>
            ) : (
            <LoginForm onChange={this.handleChanges} onSubmit={this.handleSubmit}/>
            )}
      </div>
    );
  }
}

export default App;
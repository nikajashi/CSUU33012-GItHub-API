import React, { Component } from 'react';
import './App.css';
import Dashboard from '/components/LoginForm.js';
import LoginForm from '/components/Dashboard.js';
const octokit = require('@octokit/rest')()



class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userInfo: '',
      repoData: '',
      starred: '',
      langStats: null,
      loadedPie: false,
      submit: false
    };
    
    this.baseState = this.state
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }

  reset() {
    this.setState(this.baseState)
  }

  async handleSubmit(event) {
    event.preventDefault();
    

    
    try{
    octokit.authenticate({username: this.state.username, password: this.state.password, type:'basic'})

    
    octokit.users.getAuthenticated().then(result => {
      this.setState({userInfo: result.data})

    octokit.activity.listReposStarredByUser({
      username: this.state.username,
    }).then(result => {
      this.setState({starred: result.data});
    })
       
    octokit.repos.listForUser({
      username: this.state.username
      }).then(result => {
      this.setState({repoData: result.data})
      }).then(()=>{

      this.getLanguageStats().then(res=>{
      this.setState({langStats: res, loadedPie:true})});
      
      this.getPunchCardStats()
    });
      
    })
    }
    catch(err) {
      alert("Please check your details and try again.")
      this.reset();
    }
    
      this.setState({submit:true});
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
 
  async getLanguageStats(){
    let arr = [];
    let newArray=[];
    let userRepos = this.state.repoData
    userRepos = userRepos.map(e => e.name);
      
      userRepos.forEach(e => {
      arr.push(octokit.repos.listLanguages({
        owner: this.state.username,
          repo: e
              }))
          })
          Promise.all(arr).then(repoStats => {
          let languageStats = Object()
            repoStats.map(e =>    
                    e.data
            ).filter(e => 
                Object.keys(e).length
            ).forEach(e => {
                for(let key of Object.keys(e)){
                    if(key in languageStats){
                        languageStats[key] += e[key]
                    }else{
                        languageStats[key] = e[key]
                    }
                }
                console.log('e'+e)
              })
              for (var key in languageStats) {
                var obj = {
                  name: key,
                  count: languageStats[key]
                };
                newArray.push(obj);
            }
        });
       
          
    return newArray;
  }
  
  render() {
    return (
      <div>
        {this.state.submit && this.state.loadedPunch && this.state.loadedPie ? (
          <Dashboard info={this.state.userInfo} repoData={this.state.repoData} lang={this.state.langStats} star={this.state.starred} />
            ) : (
            <LoginForm onChange={this.handleChanges} onSubmit={this.handleSubmit}/>
            )}
        </div>
        
    );
  }
}

export default App;
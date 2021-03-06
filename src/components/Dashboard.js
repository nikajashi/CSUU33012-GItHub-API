import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import User from './User.js';
import Row from 'react-bootstrap/Row';
import Star from './Starred.js';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {FaStar} from 'react-icons/fa';
import {GoDashboard} from 'react-icons/go';
import '../style/style.css';


class Dashboard extends Component {
    constructor (props) {
      super(props);
      this.state = {
        route: 1,
      };
    }

    
  render () {
    console.log(this.props.star);
    let mainPanel;

    if (this.state.route===1) {
      mainPanel= <User info = {this.props.info} stats={this.props.lang} punch={this.props.punch}/>
    }

    if (this.state.route===1) {
      mainPanel=<User info ={this.props.info}/>;
    
    } else if (this.state.route===2) {
      mainPanel= <Star starred= {this.props.star}/>
    }
    
    else{
      mainPanel=<h3>Welcome {this.props.info.login}. Click an item to start</h3>
    }

    return (
    <Container fluid style = {{margin: 0 }}>
        <div className = "notification"> You are logged in as {this.props.info.login}</div>
        <Row>
            <Col style={{color: "white", background:"#111", height:"100vh", padding:"0px"}} sm={4} md={2}>
            <Button variant="menu" onClick={(e) => this.setState({route:1})} > <GoDashboard /> Dashboard </Button>
            <Button variant="menu" onClick={(e) => this.setState({route:2})} > <FaStar /> Stars </Button>
            <div className = "profile-container">
                <img className= "gravatar" src={this.props.info.avatar_url} alt="Avatar"/>
                <h3>{this.props.info.name}</h3>
                <h3>{this.props.info.login}</h3>
                <div className ="bio">
                    {this.props.info.bio}
                </div>
            </div>
            </Col>
            <Col md={10} style = {{padding:"0px"}}>
              {mainPanel}
            </Col>
        </Row>
    </Container> 
    
    )
    }
}

export default Dashboard;
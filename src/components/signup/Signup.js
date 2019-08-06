import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { 
      username: '', 
      password: '', 
      personalEmail: '', 
      fullName: '', 
      userRole: '', 
    };
    
    this.service = new AuthService();
  }

  handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value})
  }

  tryToSignUp = (e) =>{
      e.preventDefault();
      const username = this.state.username;
      const password = this.state.password;
      const personalEmail = this.state.personalEmail;
      const fullName = this.state.fullName;
      const userRole = this.state.userRole;
    
    this.service.signup(username, password, personalEmail, fullName)
    .then(()=>{
        this.props.toggleForm('signup');
        this.props.getUser();
    })
  }

  render(){
    return(
      <form onSubmit = {this.tryToSignUp}>
        <h3>Signup For An Account</h3>
          <legend>Username</legend>
          <input value={this.state.username} name="username" onChange={this.handleChange} />

          <legend>Password</legend>
          <input value={this.state.password} name="password" onChange={this.handleChange} />

          <legend>Email Address</legend>
          <input value={this.state.personalEmail} name="personalEmail" onChange={this.handleChange} />

          <legend>Full Name</legend>
          <input value={this.state.fullName} name="fullName" onChange={this.handleChange} />

          <legend>Role</legend>
          <select name="userRole" value={this.state.userRole} onChange={this.handleChange}>
            <option value="Full Stack">Full Stack</option>
            <option value="Front End">Front End</option>
            <option value="Backend">Backend</option>
            <option value="Systems">Systems</option>
            <option value="Data">Data</option>
          </select>      
        
        <button>Submit</button>
      </form>
    )
  }
}

export default Signup;
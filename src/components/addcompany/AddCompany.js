import React, { Component } from 'react';
import axios from 'axios';
import './addcompany.css';

class AddCompany extends Component {
  constructor(props){
      super(props);
      this.state = { 
        companyName: "", 
        companyDomain: "", 
        companyRootEmail: "", 
        companyLogoUrl: "", 
        companySiteUrl: "", 
        companyLinkedinUrl: "", 
        companyGithubUrl: "",
      };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/api/companies", {
      companyName: this.state.companyName,
      companyDomain: this.state.companyDomain,
      companyRootEmail: this.state.companyRootEmail,
      companyLogoUrl: this.state.companyLogoUrl,
      companySiteUrl: this.state.companySiteUrl,
      companyLinkedinUrl: this.state.companyLinkedinUrl,
      companyGithubUrl: this.state.companyGithubUrl,
      }, {withCredentials: true })
    .then( () => {
      this.props.getData();
      // this function updates the list in CompanyIndex.js
      this.setState({
        companyName: "", 
        companyDomain: "", 
        companyRootEmail: "", 
        companyLogoUrl: "", 
        companySiteUrl: "", 
        companyLinkedinUrl: "", 
        companyGithubUrl: "",
      });
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      <div>
        <form className="add-company" onSubmit={this.handleFormSubmit}>
          <label>Company Name:</label>
          <input type="text" name="companyName" value={this.state.companyName} onChange={ e => this.handleChange(e)}/>
          <label>Primary Domain Name (.com, .net, .io, etc.):</label>
          <input type="text" name="companyDomain" value={this.state.companyDomain} onChange={ e => this.handleChange(e)} />
          <label>Root Domain of Company Email (so we can validate employees):</label>
          <input type="text" name="companyRootEmail" value={this.state.companyRootEmail} onChange={ e => this.handleChange(e)} />
          <label>Company Logo URL:</label>
          <input type="text" name="companyLogoUrl" value={this.state.companyLogoUrl} onChange={ e => this.handleChange(e)} />
          <label>Company Website URL:</label>
          <input type="text" name="companySiteUrl" value={this.state.companySiteUrl} onChange={ e => this.handleChange(e)} />
          <label>Company LinkedIn URL:</label>
          <input type="text" name="companyLinkedinUrl" value={this.state.companyLinkedinUrl} onChange={ e => this.handleChange(e)} />
          <label>Company Github Organization URL:</label>
          <input type="text" name="companyGithubUrl" value={this.state.companyGithubUrl} onChange={ e => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddCompany;
import React, { Component } from 'react';
import axios from 'axios';
import './editcompany.css';

class EditCompany extends Component {
  constructor(props){
    super(props);
    this.state = {
      companyName: this.props.theCompany.companyName, 
      companyDomain: this.props.theCompany.companyDomain,
      companyRootEmail: this.props.theCompany.companyRootEmail,
      companyLogoUrl: this.props.theCompany.companyLogoUrl,
      companySiteUrl: this.props.theCompany.companySiteUrl,
      companyLinkedinUrl: this.props.theCompany.companyLinkedinUrl,
      companyGithubUrl: this.props.theCompany.companyGithubUrl,
    }
  }
  
  handleFormSubmit = (event) => {
    const companyName = this.state.companyName;
    const companyDomain = this.state.companyDomain;
    const companyRootEmail = this.state.companyRootEmail;
    const companyLogoUrl = this.state.companyLogoUrl;
    const companySiteUrl = this.state.companySiteUrl;
    const companyLinkedinUrl = this.state.companyLinkedinUrl;
    const companyGithubUrl = this.state.companyGithubUrl;
    event.preventDefault();
    axios.post(`http://localhost:5000/api/companies/update/${this.props.theCompany._id}`,
      { companyName: companyName, 
        companyDomain: companyDomain,
        companyRootEmail: companyRootEmail,
        companyLogoUrl: companyLogoUrl,
        companySiteUrl: companySiteUrl,
        companyLinkedinUrl: companyLinkedinUrl,
        companyGithubUrl: companyGithubUrl,
      })
      .then( () => {
        this.props.getAllTheCompaniesInAppJS();
        this.props.resetEditingSituation();
      })
      .catch( error => console.log(error) )
    }

  handleChange = (event) => {  
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  render(){
    return (
      <div className="card">
        <h3 className="card-header">{this.state.companyName}</h3>
        <form className="card-body" onSubmit={this.handleFormSubmit}>
          <label>Company Name:</label>
          <input className="form-control" type="text" name="companyName" value={this.state.companyName} onChange={ e => this.handleChange(e)}/>
          <label>Primary Domain Name (.com, .net, .io, etc.):</label>
          <input className="form-control" type="text" name="companyDomain" value={this.state.companyDomain} onChange={ e => this.handleChange(e)} />
          <label>Root Domain of Company Email (so we can validate employees):</label>
          <input className="form-control" type="text" name="companyRootEmail" value={this.state.companyRootEmail} onChange={ e => this.handleChange(e)} />
          <label>Company Logo URL:</label>
          <input className="form-control" type="text" name="companyLogoUrl" value={this.state.companyLogoUrl} onChange={ e => this.handleChange(e)} />
          <label>Company Website URL:</label>
          <input className="form-control" type="text" name="companySiteUrl" value={this.state.companySiteUrl} onChange={ e => this.handleChange(e)} />
          <label>Company LinkedIn URL:</label>
          <input className="form-control" type="text" name="companyLinkedinUrl" value={this.state.companyLinkedinUrl} onChange={ e => this.handleChange(e)} />
          <label>Company Github Organization URL:</label>
          <input className="form-control" type="text" name="companyGithubUrl" value={this.state.companyGithubUrl} onChange={ e => this.handleChange(e)} />
          <div className="text-right">
            <input className="btn btn-sm btn-success save-cancel" type="submit" value="Save" />
            <button className="btn btn-sm btn-secondary save-cancel" onClick={ e => this.props.resetEditingSituation()}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

export default EditCompany;
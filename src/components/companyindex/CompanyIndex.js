import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './companyindex.css';
import AddCompany from '../addcompany/AddCompany';
import EditCompany from '../editcompany/EditCompany';

class CompanyIndex extends Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
    }
  }

  changeEditing = (whichNumber) => {
    this.setState({editing: whichNumber})
  } 

  resetEdit = () =>{
    this.setState({editing: false})
  }

  deleteCompany = (idOfCompany) =>{
    axios.delete(`http://localhost:5000/api/companies/${idOfCompany}`)
    .then(()=>{
        this.props.getData();
    })
    .catch((err)=>{
        console.log(err)
    })
  }


  showCompanies = () =>{

  const AllCompanies = this.props.allTheCompanies
    return AllCompanies.map((company, index) => {
    
    if(this.state.editing !== index){
      return (
        <div className="card text-center" key={company._id}>
          <img src={company.companyLogoUrl} className="card-img-top" alt={company.companyName} />
          <div className="card-body">
            <h5 className="card-title"><Link to={`/companies/${company._id}`}>{company.companyName}</Link></h5>
            <p className="card-text">{company.companyDomain}</p>
            <a href={company.companyLinkedinUrl} className="media-text" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in btn btn-lg btn-outline-primary"></i></a>&nbsp;
            <a href={company.companyGithubUrl} className="media-text" target="_blank" rel="noopener noreferrer"><i className="fab fa-github btn btn-lg btn-outline-primary"></i></a>
            {/* {company.companyUsers.includes(this.props.theUser._id) && 
            <div>
              <button className="btn btn-sm btn-outline-primary" onClick={()=>{this.changeEditing(index)}} >Edit</button>
              <button className="btn btn-sm btn-outline-dark" onClick = {()=>{this.deleteCompany(company._id)}} >Delete</button>
            </div>
            } */}
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated on {company.updated_at.substring(0, 10)}</small>
          </div>
        </div>
      )

    } else {
      return (
        <EditCompany 
        resetEditingSituation = {this.resetEdit} 
        theCompany = {company}
        getAllTheCompaniesInAppJS = {this.props.getData}
        />
      )
    }
  })}

  render(){
    if(this.props.ready)
      return(
        
        <div className="container-fluid">
        {/* <div style={{width: '40%', float:"right"}}><AddCompany getData={this.props.getData}/></div> */}
            <div className="card-columns">{this.showCompanies()}</div>
          </div>  
         
      )
    else
      return(<h3>loading...</h3>)
  }
}

export default CompanyIndex;
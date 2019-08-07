import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './dashboard.css';
import AddCompany from '../addcompany/AddCompany';
import EditCompany from '../editcompany/EditCompany';

class Dashboard extends Component {
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


  showTheCompanies = () =>{
    if(!this.props.theUser){
      this.props.history.push('/')
      return;
    }

  const myCompanies = this.props.allTheCompanies.filter((eachC)=>{
      return eachC.companyUsers.includes(this.props.theUser._id);
  })

  return myCompanies.map((company, index) => {
    if(this.state.editing !== index){
      return (
        <div className="card text-center" key={company._id}>
        <img src={company.companyLogoUrl} className="card-img-top" alt={company.companyName} />
        <div className="card-body">
          <h5 className="card-title"><Link to={`/companies/${company._id}`}>{company.companyName}</Link></h5>
          <p className="card-text">{company.companyDomain}</p>
          <a href={company.companyLinkedinUrl} className="media-text" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in btn btn-lg btn-outline-primary"></i></a>&nbsp;
          <a href={company.companyGithubUrl} className="media-text" target="_blank" rel="noopener noreferrer"><i className="fab fa-github btn btn-lg btn-outline-primary"></i></a>
          
          {company.companyUsers.includes(this.props.theUser._id) && 
          <div>
            <button className="btn btn-sm btn-primary my-2" onClick={()=>{this.changeEditing(index)}} >Edit</button>
            {/* <button className="btn btn-sm btn-outline-danger" onClick = {()=>{this.deleteCompany(company._id)}} >Delete</button> */}
          </div>
          }
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
      return (
        <div className="container-fluid">
          <div className=""><AddCompany getData={this.props.getData}/></div>
          <div className="card-columns">{this.showTheCompanies()}</div>
        </div>  
      ) 
      else
      return(
        <div className="text-center">
          <div className="spinner-grow text-primary" role="status"></div>
          <div className="spinner-grow text-secondary" role="status"></div>
          <div className="spinner-grow text-success" role="status"></div>
          <div className="spinner-grow text-danger" role="status"></div>
          <div className="spinner-grow text-warning" role="status"></div>
          <div className="spinner-grow text-info" role="status"></div>
       </div>
        )
  }
}

export default Dashboard;
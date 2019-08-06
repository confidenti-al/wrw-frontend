import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddTechnology from '../addtechnology/AddTechnology';
import EditTechnology from '../edittechnology/EditTechnology';
import "./companydetails.css";

class CompanyDetails extends Component{
  constructor(props){
    super(props)
    this.state = {
      editing: false,
      companyId: this.props.match.params.theID,
    }
  }

  resetEdit = () =>{
    this.setState({editing: false})
  }

  edit = (whichNumber) =>{
    this.setState({editing: whichNumber})
  }

  deleteTechnology = (companyId, techId) =>{
    axios.put('http://localhost:5000/api/companies/technologies',{company: companyId,technology: techId })
      .then(()=>{
        this.props.getData();
        })
        .catch((err)=>{
            console.log(err)
      })
    }
    
  render(){
    const allTheCompanies = this.props.allTheCompanies;
    const theID = this.props.match.params.theID;
    const theActualCompany = allTheCompanies.find((eachC)=>{
      return eachC._id === theID
    });

    const showButtons = (eachTechnology,index) => {
      if(this.props.theUser && theActualCompany.companyUsers.includes(this.props.theUser._id) ){
        return (<div className="text-center">
          <button className="btn btn-sm btn-primary" onClick = {()=>{this.edit(index)}}>Edit</button>
          <button className="btn btn-sm btn-outline-danger ml-1" onClick = {()=>{this.deleteTechnology(theActualCompany._id, eachTechnology._id)}}>Delete</button>
          </div>);
        
    } else {
      return null;
    }
    }

    const showTech = () =>{
    if(theActualCompany)  
    return theActualCompany.companyTechnologies.map((eachTechnology, index)=>{
    
      if(this.state.editing !== index)
        return ( 
          
          <div className="media bg-white border rounded" key={eachTechnology._id}>
            <img src={eachTechnology.techIconUrl} className="border rounded bg-light align-self-start mr-3 media-img-size" alt={eachTechnology.techName} />
          <div className="media-body">
            <h5 className="media-title mt-0">{eachTechnology.techName}</h5>
            <div className="media-text">{eachTechnology.techDescription}</div>
            <a href={eachTechnology.techRefUrl} className="media-text" target="_blank" rel="noopener noreferrer">{eachTechnology.techName} - Reference <i className="fas fa-external-link-alt small"></i></a>
            <p><small className="text-muted">Last updated on {eachTechnology.updated_at.substring(0, 10)}</small></p>
            
          </div>
          {showButtons(eachTechnology, index)}
          </div>
      
        )
        else
          return(
            <EditTechnology
              theTechnology ={eachTechnology}
              getAllTheCompaniesInAppJS = {this.props.getData}
              resetEditingSituation = {this.resetEdit}
            />
            )
        })
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
    
  if(theActualCompany)
      return(
        <div className="container">
        <div>
        <div className="card text-center mx-auto" key={theActualCompany._id}>
          <img src={theActualCompany.companyLogoUrl} className="card-img-top mx-auto" alt={theActualCompany.companyName} />
            <div className="card-body">
            <h5 className="card-title"><Link to={`/companies/${theActualCompany._id}`}>{theActualCompany.companyName}</Link></h5>
            <p className="card-text">{theActualCompany.companyDomain}</p>
            <a href={theActualCompany.companyLinkedinUrl} className="media-text" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in btn btn-lg btn-outline-primary"></i></a>&nbsp;
          <a href={theActualCompany.companyGithubUrl} className="media-text" target="_blank" rel="noopener noreferrer"><i className="fab fa-github btn btn-lg btn-outline-primary"></i></a>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated on {theActualCompany.updated_at.substring(0, 10)}</small>
          </div>
        </div>
        

        {theActualCompany.companyTechnologies.length > 0 && 
          <div className="mx-auto">
            <br />
            <div className="text-center mx-auto"><h5>Technologies at {theActualCompany.companyName}</h5></div>
              <div className="mx-auto">
              {showTech()}
              </div>
            </div>
    
        }
        <div className="right-side-column" style={{float: 'right'}}>
          <AddTechnology 
          theCompanyToAddTechnologiesTo = {theActualCompany._id} 
          getData = {this.props.getData}
          />
          </div>
        </div>
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
        );
    }
}

export default CompanyDetails;

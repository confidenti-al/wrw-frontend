import React, { Component } from 'react';
import axios from 'axios';
import './addtechnology.css';


class AddTechnology extends Component {
  constructor(props){
      super(props);
      this.state = { 
        techName: "", 
        techIconUrl: "",
        techDescription: "",
        techRefUrl: "",
        techTopic: "",
      };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/api/technologies", {
      techName: this.state.techName,
      techIconUrl: this.state.techIconUrl,
      techDescription: this.state.techDescription,
      techRefUrl: this.state.techRefUrl,
      techTopic: this.state.techTopic,
      theCompany: this.props.theCompanyToAddTechnologiesTo,
    }, {withCredentials: true })
    .then( () => {
      this.props.getData();
      // this function updates the list in CompanyIndex.js
      this.setState({
        techName: "", 
        techIconUrl: "",
        techDescription: "",
        techRefUrl: "",
        techTopic: "",
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
        <form className="add-technology" onSubmit={this.handleFormSubmit}>
          <label>Technology Name:</label>
          <input type="text" name="techName" value={this.state.techName} onChange={this.handleChange}/>
          <label>Technology Icon URL:</label>
          <input type="text" name="techIconUrl" value={this.state.techIconUrl} onChange={this.handleChange} />
          <label>Technology Description:</label>
          <textarea name="techDescription" value={this.state.techDescription} onChange={this.handleChange} />
          <label>Technology Reference URL:</label>
          <input type="text" name="techRefUrl" value={this.state.techRefUrl} onChange={this.handleChange} />
          <select name="techTopic" value={this.state.techTopic} onChange={this.handleChange}>
            <option value="Full Stack">Full Stack</option>
            <option value="Front End">Front End</option>
            <option value="Backend">Backend</option>
            <option value="Systems">Systems</option>
            <option value="Data">Data</option>
          </select>          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddTechnology;
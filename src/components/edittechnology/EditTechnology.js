import React, { Component } from 'react';
import axios from 'axios';

class EditTechnology extends Component {
  constructor(props){
    super(props);
    this.state = {
      techName: this.props.theTechnology.techName, 
      techIconUrl: this.props.theTechnology.techIconUrl,
      techDescription: this.props.theTechnology.techDescription,
      techRefUrl: this.props.theTechnology.techRefUrl,
      techTopic: this.props.theTechnology.techTopic,
    }
  }

  handleFormSubmit = (event) => {
    const techName = this.state.techName;
    const techIconUrl = this.state.techIconUrl;
    const techDescription = this.state.techDescription;
    const techRefUrl = this.state.techRefUrl;
    const techTopic = this.state.techTopic;
    event.preventDefault();
    axios.post(`http://localhost:5000/api/technologies/update/${this.props.theTechnology._id}`,
      { techName: techName, 
        techIconUrl: techIconUrl,
        techDescription: techDescription,
        techRefUrl: techRefUrl,
        techTopic: techTopic,
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
    console.log(this.state);
    return (
      <div className="media bg-white border rounded">
        
        <form className="media-body" onSubmit={this.handleFormSubmit}>
          <label>Technology Name:</label>
          <input className="form-control" type="text" name="techName" value={this.state.techName} onChange={ e => this.handleChange(e)}/>
          <label>Technology Icon URL:</label>
          <input className="form-control" type="text" name="techIconUrl" value={this.state.techIconUrl} onChange={ e => this.handleChange(e)} />
          <label>Technology Description:</label>
          <textarea className="form-control" name="techDescription" rows="3" value={this.state.techDescription} onChange={ e => this.handleChange(e)} />
          <label>Technology Reference URL:</label>
          <input className="form-control" type="text" name="techRefUrl" value={this.state.techRefUrl} onChange={ e => this.handleChange(e)} />
          <label>Topic:</label>
          <select className="form-control" name="techTopic" value={this.state.techTopic} onChange={ e => this.handleChange(e)}>
            <option value="Full Stack">Full Stack</option>
            <option value="Front End">Front End</option>
            <option value="Backend">Backend</option>
            <option value="Systems">Systems</option>
            <option value="Data">Data</option>
          </select>          
          <div className="text-right">
            <input className="btn btn-sm btn-success save-cancel" type="submit" value="Save" />
            <button className="btn btn-sm btn-secondary save-cancel" onClick={ e => this.props.resetEditingSituation()}>Cancel</button>
          </div>
        </form>
        
      </div>
    )
  }
}

export default EditTechnology;
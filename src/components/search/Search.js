import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      listOfCompanies: [],
      searchField: '',
      companyName: '',
      companySiteUrl: '',
      companyLogoUrl: '',       
    };
  }

  getAllCompanies = () => {
    axios.get(`http://localhost:5000/api/companies`)
    .then(responseFromApi => {
      this.setState({
        listOfCompanies: responseFromApi.data, ready: true
      })
    })
  }

  onInputChange=(e)=>{
    console.log(e.target.name, e.target.value)
      const { name, value } = e.target;
      this.setState({ [name]: value });
      this.checkForCompany();
    }

    checkForCompany() {
    const matchedCompany = this.state.listOfCompanies.filter(company => {
      if (company.companyName.includes(this.state.searchField)) {
        return true;
      } else {
        this.getData(this.value);
        // console.log(this.value);
        this.setState({
          companyName: this.state.companyName,
          companySiteUrl: this.state.companySiteUrl,
          companyLogoUrl: this.state.companyLogoUrl,
        });
        // console.log(this.state)
      }
    })};

  getData(name) {
    // console.log(name)
    axios.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=:' + name)
      .then((response) => {
        // console.log(response)
        // return response.json();
      })
    }

  componentWillMount(){
    this.getAllCompanies();
  }

  render(){
    return(
    // not sure what to do with this stuff below
    //companyName.text(data.name);
    //companySiteUrl.text(data.domain);
    //companyLogoUrl.attr('src', data.logo);
    <div className="container">
      <div className="input-group py-4">
            <input className="form-control form-control-lg" type="search" id="example-search-input" name="searchField" value={this.state.searchField} onChange={(e)=>{this.onInputChange(e)}} placeholder="enter a company name..." />
            <span className="input-group-append">
              <button className="btn btn-outline-secondary disabled" type="button">
                  <i className="fa fa-search"></i>
              </button>
            </span>
      </div>
    </div>


    
    )}
}

export default Search;
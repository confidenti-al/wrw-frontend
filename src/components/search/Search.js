import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      listOfCompanies: [],
      companiesListClone: [],
      searchField: '',
      companyName: '',
      companySiteUrl: '',
      companyLogoUrl: '', 
      apiCompaniesList: []      
    };
  }

  getAllCompanies = () => {
    axios.get(`http://localhost:5000/api/companies`)
    .then(responseFromApi => {
      this.setState({
        listOfCompanies: responseFromApi.data,
        companiesListClone: responseFromApi.data,
        ready: true
      })
    })
  }

  onInputChange=(e)=>{
    console.log(e.target.name, e.target.value);
      const { name, value } = e.target;
      this.setState({ [name]: value });
      this.checkForCompany();
    }

   async checkForCompany() {
    let filteredCompaniesApi = [];
      let companyListClone = [...this.state.listOfCompanies];
      const matchedCompanies = companyListClone.filter((company, i) => {
      return (company.companyName.toUpperCase().includes(this.state.searchField.toUpperCase()))
      }  
    )
    if(matchedCompanies.length <= 3){
      let companiesFromApi = await this.getData(this.state.searchField);
      matchedCompanies.forEach(oneCompany => {
        companiesFromApi.forEach(apiCompany => {
          console.log("match this <<<<<< ", oneCompany.companyName.toUpperCase(), " >>>>>>>>>>>>>>>> ", apiCompany.name.toUpperCase(), " ======== ", String(apiCompany.name.toUpperCase()) === String(oneCompany.companyName.toUpperCase()))
          if(String(apiCompany.name.toUpperCase()) !== String(oneCompany.companyName.toUpperCase())) {
            filteredCompaniesApi.push(apiCompany);
          }
        })
      })

    }
    console.log('matched:', matchedCompanies,'filtered:', filteredCompaniesApi)

    this.setState({companiesListClone: matchedCompanies, apiCompaniesList: filteredCompaniesApi});
  };

  getData(name) {
    return axios.get('https://autocomplete.clearbit.com/v1/companies/suggest?query=:' + name)
      .then((response) => {
        return response.data;
      })
    }

  componentWillMount(){
    this.getAllCompanies();
  }

  render(){
    return(
    <div className="container">
      <div className="input py-4">
            <input className="form-control form-control-lg" 
            type="search" 
            id="example-search-input" 
            name="searchField" 
            value={this.state.searchField} 
            onChange={(e)=>{this.onInputChange(e)}} 
            placeholder="enter a company name..." 
            />
            {/* <span className="input-group-append">
              <button className="btn btn-outline-secondary disabled" type="button">
                  <i className="fa fa-search"></i>
              </button>
            </span> */}
      </div>
    </div>
    )}
}

export default Search;
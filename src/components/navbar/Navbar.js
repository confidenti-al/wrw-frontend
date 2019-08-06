import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

function Navbar(props){
  const doTheLogout = () =>{
    props.pleaseLogOut()
    .then(()=>{
    props.getUser();
    })
  }

  return(
    <nav className="navbar navbar-expand-lg collapse-md navbar-dark">
      
      <div>
      <Link className="logo" to="/"><img src="../wrw-logo.png" alt="WhoRunsWhat" /></Link>
      </div>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar1" aria-controls="Navbar1" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse" id="Navbar1">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link className="nav-link" to="/companies">Companies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/technologies">Technologies</Link>
            </li> */}
          </ul>
          {/* <form className="form-inline my-2 my-md-0">
            <input className="form-control" type="text" placeholder="enter a company name..." aria-label="Search" />
          </form> */}
            
          <ul className="navbar-nav">
            {props.theUser && 
            <li>
              <Link className="nav-link active" exact to="/dashboard">My Dashboard</Link> 
            </li>
            }
          </ul>
            

          {!props.theUser && 
          <span className="right">
            <button className="btn btn-sm btn-outline-light login-signup" onClick = {()=> props.toggleForm('login')}>Login</button>
            <button className="btn btn-sm btn-outline-light login-signup" onClick = {()=> props.toggleForm('signup')}>Sign Up</button>
          </span>
          }

          {props.theUser && 
          <div>
            {/* <span className="user-info">{props.theUser.username}</span> */}
            <div className="btn btn-sm btn-outline-light logout" onClick = {doTheLogout} >Log Out</div>
          </div>
          }
        </div>

  </nav>
  )
}

export default Navbar;
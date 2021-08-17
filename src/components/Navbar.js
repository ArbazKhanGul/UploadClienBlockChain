import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light  ">
  <div className="container-fluid">
    <NavLink className="navbar-brand"  exact to="/" style={{color:"white"}}>Block Chain</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  mb-2 mb-lg-0 ml-auto">
        <li className="nav-item">
          <NavLink activeClassName="active-class" className="nav-link links" style={{color:"white"}} aria-current="page"  exact  to="/">Home</NavLink>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" style={{color:"white"}} href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </a>
          <ul className="dropdown-menu mt-2" aria-labelledby="navbarDropdown">
            <li><NavLink to="/adminaccept"  style={{color:"black"}}className="dropdown-item links" href="#">Accepted Requests</NavLink></li>
            <li><NavLink  to="/adminpending" style={{color:"black"}} className="dropdown-item links" href="#">Pending Requests</NavLink></li>
            <li><NavLink  to="/registeredusers" style={{color:"black"}} className="dropdown-item links" href="#">Registered Users</NavLink></li>
            <li><NavLink  to="/receiveraddress" style={{color:"black"}} className="dropdown-item links" href="#">Receiver Address</NavLink></li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link links" style={{color:"white"}} exact activeClassName="active-class"  to="/SignUp">SignUp</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link links" style={{color:"white"}} exact activeClassName="active-class"  to="/Login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link links" style={{color:"white"}} exact activeClassName="active-class" to="/Project">Project</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link links"  exact activeClassName="active-class" style={{color:"white"}} to="/clientviewing">Submitted forms</NavLink>
        </li>
        
      </ul>

    </div>
  </div>
</nav>
        </>
    )
}

export default Navbar

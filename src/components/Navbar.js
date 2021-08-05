import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
  <div className="container-fluid">
    <NavLink className="navbar-brand"  exact to="/">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  mb-2 mb-lg-0 ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page"  exact activeClassName="active-class" to="/">Home</NavLink>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  href="/#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </a>
          <ul className="dropdown-menu mt-2" aria-labelledby="navbarDropdown">
            <li><NavLink to="/adminaccept" className="dropdown-item" href="#">Accepted Requests</NavLink></li>
            <li><NavLink  to="/adminpending" className="dropdown-item" href="#">Pending Requests</NavLink></li>
            <li><NavLink  to="/registeredusers" className="dropdown-item" href="#">Registered Users</NavLink></li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  exact activeClassName="active-class"  to="/SignUp">SignUp</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact activeClassName="active-class"  to="Login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  exact activeClassName="active-class" to="Project">Project</NavLink>
        </li>
      </ul>

    </div>
  </div>
</nav>
        </>
    )
}

export default Navbar

import React from 'react'
import NavBar from './components/Navbar'
import Login from "./components/Login"
import Register from "./components/Registration"
import {Route,Switch}  from "react-router-dom"
import Project from './components/Project'
import Home from './components/Home'
import ErrorPage from './components/ErrorPage'
import AdminAccept from './components/AdminAccept'
import AdminPending from './components/AdminPending'
import RegisteredUsers from "./components/RegisteredUsers";
function App() {
  return (
   <>
   <NavBar></NavBar>

   <Switch>

   <Route exact path="/" component={Home}></Route>
   <Route path="/Login" component={Login}></Route>
   <Route path="/SignUp" component={Register}></Route>
   <Route path="/project" component={Project}></Route>
   <Route path="/adminaccept" component={AdminAccept}></Route>
   <Route path="/adminpending" component={AdminPending}></Route>
   <Route path="/registeredusers" component={RegisteredUsers}></Route>
   <Route component={ErrorPage}></Route>
   </Switch>
</>
  )
}

export default App

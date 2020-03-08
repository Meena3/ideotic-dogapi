import React from 'react';
import './App.css';
import {BrowserRouter,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from './components/Register';
import Logout from './components/Logout';
import Home from "./components/Home";

export default  class App extends React.Component{
  render(){
      return(
        <div>
          <BrowserRouter>
          <Navbar/>
          <Route path = "/home" exact component = {Home}/>
          <Route path = "/register" component = {Register}/>
          <Route path = "/logout" component = {Logout}/>
          <Route path = "/login" exact component = {Login}/>
        </BrowserRouter>
        </div>
      )
    }
      
}



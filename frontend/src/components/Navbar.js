import React from "react";
import {Link} from "react-router-dom";
import './Navbar.css';

export default class Navbar extends React.Component{
    render(){
        let token = localStorage.getItem("token")
        // console.log(token)
        if(token){
            window.location.reload(false)
            return(
                <div>
                    <nav>
                        <input type= "checkbox" id = "check"></input>
                        <label for = "check" className="checkbtn">
                            <i className ="fa fa-bars"></i>
                        </label>
                        <label className = "logo">
                            <Link to = "/home">Dog Api</Link>
                        </label>
                        <ul>
                            <li><Link to = "/logout">Logout</Link></li>
                        </ul>
                    </nav>
                </div>
            )

        }
        else{
            window.location.reload(false)
            return(
                <div>
                    <nav>
                       <label className = "logo">
                            <Link to = "/">Dog Api</Link>
                        </label>
                        <ul>
                            <li><Link to = "/login">Login</Link></li>
                            <li><Link to = "/register">Register</Link></li>
                        </ul>
                    </nav>
                </div>
            )
        }
    }
}
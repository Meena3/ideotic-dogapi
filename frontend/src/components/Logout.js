import React from "react";
import {Redirect} from "react-router-dom"

class Logout extends React.Component{
    componentDidMount = () =>{
        localStorage.removeItem("token")
        window.location.reload(false)
    }
    render(){
        return(
            <div>
                <h1>You logged out please Login </h1>
                <Redirect to = "/login"></Redirect>
            </div>
        )
    }
} 
export default Logout;



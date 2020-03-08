import React from "react";
import './Login.css';
import axios from "axios"

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleClick = (e) =>{
        e.preventDefault()
        var details = {
            email:this.state.email,
            password:this.state.password
        }
        axios.post("http://127.0.0.1:5000/login",details)
        .then(response =>{
            console.log(response.data)
            window.localStorage.setItem("token",response.data)
            this.props.history.push("/home")   
        })
        .catch(error =>{
            console.log(error)
        });
    }
    render(){
        return(
            <div>
                <h1>Welcome..!</h1>
            <div className = "container">
                <div className="form">
                    <div className="fields">
                        <input type = "email" className="input" placeholder="Email Id"
                            name = "email" value = {this.state.email} 
                            onChange = {(e) => {this.handleChange(e)}}
                        />
                        <input type = "password" className="input" placeholder="Password"
                            name = "password" value = {this.state.password} 
                            onChange = {(e) => {this.handleChange(e)}}
                        />
                    </div>
                    <div className="btn">
                        <div onClick= {(e) =>{this.handleClick(e)}}>Login</div>
                    </div>
                </div>
            </div>
            </div>

        )
    }
}
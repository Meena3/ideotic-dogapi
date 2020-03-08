import React from "react";
import './Login.css';
import axios from "axios";

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_name:"",
            email:"",
            password:""
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleClick = (e) =>{
        e.preventDefault()
        var details ={
            user_name:this.state.user_name,
            email:this.state.email,
            password:this.state.password
        }
        axios.post("http://127.0.0.1:5000/register",details)
        .then(response =>{
            console.log(response)
            alert("Welcome You Successfully Registered")
            this.props.history.push('/login')
        })
        .catch(error =>{
            console.log(error)
        });
    }
    render(){
        return(
            <div className = "container" >
                <div className="form">
                    <div className="fields">
                        <input type = "text" className="input" placeholder="User Name"
                            name = "user_name" value = {this.state.user_name} onChange = {(e) => {this.handleChange(e)}}
                        />
                        <input type = "email" className="input" placeholder="Email Id"
                            name = "email" value = {this.state.email} onChange = {(e) => {this.handleChange(e)}}
                        />
                        <input type = "password" className="input" placeholder="Password"
                            name = "password" value = {this.state.password} onChange = {(e) => {this.handleChange(e)}}
                        />
                    </div>
                    <div className="btn">
                        <div onClick= {(e) =>{this.handleClick(e)}}>Register</div>
                    </div>
                </div>
            </div>
        )
    }
}
import React from "react";
import axios from "axios";
import "./Home.css"

export default class Home extends React.Component{
    constructor(props){
        super(props);
            this.state={
                list:[]
            }
    }
    componentDidMount = () =>{
        window.location.reload(false)
        axios.get("http://127.0.0.1:5000/get_details")
            .then(response =>{
                // console.log(response)
                this.setState({
                    list:response.data
                })
               
            })
            .catch(error =>{
                console.log(error);
                
            })
    }
    render(){
        console.log(this.state.list)
        return(
            <div>
                <h1>Here All DogS</h1>
                <div className = "flex-container">
                    {this.state.list.map((elm) =>{
                        return(
                            <div className="card">
                                <img src = {`http://127.0.0.1:5000/${elm[0]}`} 
                                    alt = "Dog Images"
                                    style={{height:"300px", width:"400px"}}
                                />
                                <h3>{elm[1]}</h3>
                            </div>
                        )
                    })}
                       </div>
                </div>
                
        )
    }
} 


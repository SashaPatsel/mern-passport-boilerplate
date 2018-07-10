import React, { Component } from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import "./home.css"


class Home extends Component {
  //use constructor so that you can give props
state = {
      isLoggedIn: false,
      userName: "",
      email: ""
    }
  
    componentWillMount(){
      API.getUser()
      .then(user=>{
        console.log(user)
      })

    const home = this
    
      async function setUserInfo() {
        const cookie = document.cookie.split(";");
        console.log("cookie", cookie)
        let userName = cookie[0];
        userName = userName.split("=");
        userName = userName[1];
        console.log("userName:", userName);
        home.setState({
          userName: userName
        })
      }
      setUserInfo()
  }

  logout = () => {
    API.logout().then(res => {
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.userName}</h1>
        <a href="/"> <button onClick={this.logout}>Sign Out</button></a>
      </div>
    )
  }
}

export default Home;
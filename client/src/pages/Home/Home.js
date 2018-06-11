import React, { Component } from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import "./home.css"


class Home extends Component {
  state = {
    name: "Timmy",
    matches: [],
    offers: [],
    userName: ""
  }

  componentDidMount() {
    this.getUserId();
    this.readCookies();
  }
readCookies() {
  const cookie = document.cookie.split(";");
    console.log("cookie", cookie)
    // if (document.cookie.length < 1) {
    //   window.location.href = "/";
    // }
}

  getUserId = () => {
    const cookie = document.cookie.split(";");
    console.log("cookie", cookie)
    let userName = cookie[0];
    userName = userName.split("=");
    userName = userName[1];
    console.log("userName:", userName);
    this.setState({ userName: userName });
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.userName}</h1>
      </div>
    )
  }
}

export default Home;
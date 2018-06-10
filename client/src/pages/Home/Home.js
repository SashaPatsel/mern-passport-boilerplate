import React, { Component } from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import "./home.css"


class Home extends Component {
  state = {
    name: "Timmy",
    matches: [],
    offers: [],
    UserID: ""
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
    let userID = cookie[0];
    userID = userID.split("=");
    userID = userID[1];
    console.log("userID:", userID);
    this.setState({ UserId: userID });
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}</h1>
      </div>
    )
  }
}

export default Home;
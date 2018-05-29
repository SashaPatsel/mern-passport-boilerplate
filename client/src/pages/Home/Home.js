import React, { Component } from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import "./home.css"


class Home extends Component {
  state = {
    name: "Lucy",

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
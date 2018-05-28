import React, { Component } from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import "./landing.css"
import { Input, TextArea, FormBtn } from "../../components/Form";

class Landing extends Component {
  state = {
    userName: "",
    email: ""
  }

  render() {
    return (
      <div>
        <div className="dead-center">

          <form>
            <Input
              value={this.state.userName}
              onChange={this.handleInputChange}
              name="userName"
              placeholder="User Name"
            />
            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="email"
            />
            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              placeholder="password"
              type="password"
            />
            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              placeholder="re-enter password"
              type="password"
            />

          </form>

        </div>
      </div>
    )
  }
}

export default Landing;
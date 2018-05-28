import React, { Component } from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import "./landing.css"
import { Input, TextArea, FormBtn } from "../../components/Form";
import Card from "../../components/Card/Card.js"

class Landing extends Component {
  state = {
    userName: "",
    email: ""
  }

  render() {
    return (
      <div>
        <div className="dead-center">
          <Card>
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
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Sign Up
              </FormBtn>
            </form>
          </Card>
        </div>
      </div>
    )
  }
}

export default Landing;
import React, { Component } from "react";
import API from "../../utils/API"
import { Link, Redirect } from "react-router-dom";
import "./landing.css"
import { Input, TextArea, FormBtn } from "../../components/Form";
import Card from "../../components/Card/Card.js"

class Landing extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    password2: "",
  }

  //Pull from state in order to post user info
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.userName && this.state.email && this.state.password && this.state.password2) {
      if (this.state.password === this.state.password2) {
        API.createUser({
          userName: this.state.userName,
          email: this.state.email,
          password: this.state.password
        }).then(res => {
          console.log("yo?")
          window.location.href = "/home";
          })
          .catch(err => console.log(err));
      } else {
        console.log("please make sure your passwords match")
      }
    } else {
      console.log("please make sure you fill out all the fields")
    }

  };

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
                value={this.state.password2}
                onChange={this.handleInputChange}
                name="password2"
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
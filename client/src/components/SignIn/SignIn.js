import React, { Component } from "react";
import "./signin.css";
import { Input, TextArea, FormBtn } from "../Form";

class SignIn extends Component {
  // Setting the component's initial state
state = {
      email: "",
      password: ""
    };
  

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
  
    event.preventDefault();

    fetch("/auth/signin", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(response  => {
      console.log(response)

      window.location.href = "/";
    }).catch(err => {
      console.log(err);
    })

    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <div className="mern-signin">
        <form>
          <div className="float-left right space">
          <Input
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Email Address"
          />
          </div>
          <div className="float-left right space">
          <Input
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="password"
            placeholder="Password"
          />
          </div>
          <div className="float-left">
          <FormBtn onClick={this.handleFormSubmit}> Sign In
          </FormBtn>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;

import React, { Component } from "react";
import API from "../../utils/API"
import { Link, Redirect } from "react-router-dom";
import "./landing.css"
import { Input, TextArea, FormBtn } from "../../components/Form";
import Card from "../../components/Card/Card.js"
import SignUp from "../../components/SignUp/SignUp.js"
import OAuthButton from "../../components/OAuthButton/OAuthButton.js"

class Landing extends Component {
  render() {

    return (
      <div>
       <SignUp/>
       <OAuthButton />
      </div>
    )
  }
}

export default Landing;
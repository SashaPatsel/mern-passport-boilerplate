import React, { Component } from "react";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Landing from "./pages/Landing/Landing.js";
import Home from "./pages/Home/Home.js";
import SP from "./components/SP/SP.js"
import API from "./utils/API"
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";


class ProxyContainer extends Component {
state = {
  isLoggedIn: false,
  username: "",
  email: ""
}

componentWillMount(){
  API.getUser()
  .then(user=>{
    console.log(user)
    this.setState({
      isLoggedIn: user.data.loggedIn,
      username: user.data.username,
      email: user.data.email
    });
  })
}



  render() {
    const cookie = document.cookie.split(";");
    console.log("cookie", cookie)
    // covert to tru
    if (this.state.isLoggedIn) {
      return (
        <Router>
            <div>
              <Nav />
              <Switch>
                <Route exact path="/" component={Home} username={this.state.username} email={this.state.email}/>
                <Route path="/home" 
                  component={Home} 
                  username = {this.state.username} 
                  email={this.state.email} 
                />
                <Route component={NoMatch} />
              </Switch>
              {/* <SP/> */}
            </div>
      
          </Router>
        )

    } else {


    return (
      <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    </Router>
     

    )
  }
  }


}

export default ProxyContainer;


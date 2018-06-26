import React, { Component } from "react";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Landing from "./pages/Landing/Landing.js";
import Home from "./pages/Home/Home.js";
import SP from "./components/SP/SP.js"
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) //fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to="/login" />
  )} />
)
class ProxyContainer extends Component {

  render() {
    return (

      <Router>
        <div>

          <Link to="/">Landing</Link>
          <br />
          <Link to="/home">home </Link>

          <Route path="/" component={Landing} />
          <Route path="/login" component={Nav} />
          <PrivateRoute path="/home" component={Home} />
        </div>
      </Router>
    )
  }
}

export default ProxyContainer;

{/* <Nav />
          <Switch>
            <Route path="/" component={Landing} />
          </Switch> */}

    // const cookie = document.cookie.split(";");
    // console.log("cookie", cookie)
    // if (cookie.length > 1) {
    //   return (

    //     <Router>
    //       <div>
    //         <Nav />
    //         <Switch>
    //           <Route exact path="/" component={Home} />
    //           <Route path="/home" component={Home} />
    //           <Route component={NoMatch} />
    //         </Switch>
    //         {/* <SP/> */}
    //       </div>

    //     </Router>
    //   )
    // }

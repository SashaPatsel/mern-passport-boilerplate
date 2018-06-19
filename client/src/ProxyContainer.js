import React, { Component }  from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Landing from "./pages/Landing/Landing.js";
import Home from "./pages/Home/Home.js";
import SP from "./components/SP/SP.js"

class ProxyContainer extends Component {
	render() {
		if (document.cookie.length < 1) {
			return (
			<div>
				<Router> 
					<Switch>
						<Route path="/" component={Landing} />
					</Switch>
				</Router>
			</div>
		) }

		
		return (
      <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route component={NoMatch} />
        </Switch>
        {/* <SP/> */}
      </div>
  
    </Router>
			)
		
	}


}

export default ProxyContainer;


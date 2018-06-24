import React from "react";
import SignIn from "../SignIn/SignIn.js"
import "./nav.css"

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark mern-nav">
  {/* <div className="row">  */}
      {/* <div className="col-md-2"> */}
        <a className="navbar-brand" href="/">
          MERN w/ Passport!
        </a>
      {/* </div> */}
      {/* <div className="col-md-5"></div> */}
      {/* <div className="col-md-9"> */}
        <div className="right-align">
          <SignIn />
        </div>
      {/* </div> */}
      {/* </div> */}
  </nav>
);

export default Nav;

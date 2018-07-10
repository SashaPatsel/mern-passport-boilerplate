import React from "react";
import "./oauth-button.css";

const OAuthButton = props => (
  <div>
      <div className="btn-text--anim-trig">
        <a href="/auth/meetup" className="btn-text">
          <i className="fa fa-meetup" aria-hidden="true"></i>
        </a>
      </div>
  </div>
);

export default OAuthButton;

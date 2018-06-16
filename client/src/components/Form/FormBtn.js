import React from "react";
import "./form-btn.css"

export const FormBtn = props => (
  <button {...props} className="mern-form-btn" >
    {props.children}
  </button>
);

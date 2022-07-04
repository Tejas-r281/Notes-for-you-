import React from "react";
// import ErrorIcon from "@material-ui/icons/Error";
import "./NotFound.css";
// import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">


     Page Not Found
      <Link to="/">Login Again Please</Link>
    </div>
  );
};

export default NotFound;

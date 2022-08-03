import React, { Fragment, useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


function Header() {


  const {success,keys}= useSelector((state) => state.me);


  useEffect(() => {

  }, [success]);


  return (
    <><nav className="navbar container navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <button className="btn btn-primary">
        <a className="navbar-brand text-white" href="/">Home</a>
      </button>

        <Link to="/admin">
          <button className="btn btn-primary">Admin</button>
        </Link>
        <Link to="/upload">
          <button className="btn btn-primary">Upload Your Notes</button>
        </Link>

        <Link to="/loginsignup">
          <button className="btn btn-primary">{success?keys.user.name:'Login'}</button>
        </Link>




      </div>
    </nav></>
  )
}

export default Header
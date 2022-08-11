import React, { Fragment, useState, useEffect } from "react";
import {Link,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../../actions/userAction";
import { useraction } from "../../actions/landingAction";
import { useAlert } from "react-alert";




function Header() {

  const alert = useAlert();
  const nav = useNavigate();
  const dispatch = useDispatch();


  const {success,keys}= useSelector((state) => state.me);

  const check=async(e)=>
  {
    // console.log("raushan");
      if(keys && keys.user)
      {
       await dispatch(logout());
        alert.show("you are logged out");
       await dispatch(useraction()); 
        return;
      }
      else
      {
       await nav(`/loginsignup`);
       await dispatch(useraction());
        return ;
      }
  }


  useEffect(() => {

  }, [success]);


  return (
    <><nav className="navbar container navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <button className="btn btn-primary">
        <a  className="navbar-brand text-white" href="/">Home</a>
      </button>

        <Link to="/admin">
          <button className="btn btn-warning">Admin</button>
        </Link>
        <Link to="/upload">
          <button className="btn btn-danger">Upload Your Notes</button>
        </Link>


          <button className="btn btn-success " onClick={check}>{success?keys.user.name:'Login'}</button>





      </div>
    </nav></>
  )
}

export default Header
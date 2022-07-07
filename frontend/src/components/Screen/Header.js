import React from 'react'
import {Link} from "react-router-dom";

function Header() {
  return (
    <><nav className="navbar container navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <Link to="/upload">
          <button className="btn btn-primary">Upload Your Notes</button>
        </Link>

        <Link to="/loginsignup">
          <button className="btn btn-primary">SignUp</button>
        </Link>




      </div>
    </nav></>
  )
}

export default Header
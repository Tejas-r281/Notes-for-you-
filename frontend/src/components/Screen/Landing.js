import React from 'react'
import "./Landing.css"
import Subject from "./Subjects";
import Showfiles from "./Showfiles";
// import header
import Header from "./Header";

function Landing() {
  return (
    <>
      <Header/>
    <div className="container home">
      <div className="homeleft">
        <div className="homelefttop">
            This will be headind section
        </div>

        <div>
        <Showfiles/>
        </div>
      </div>
      <div className="homeright">
       <Subject/>
      </div>
    </div>
    </>
  )
}

export default Landing
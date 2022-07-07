import React from 'react'
import "./Landing.css"
import Subject from "./Subjects";
import Showfiles from "./Showfiles";
// import header
import Header from "./Header";
import {dispatch,useSelector} from "react-redux";

function Landing() {
    // const dispatch = useDispatch();
    const {subject}= useSelector((state) => state.change);
  return (
    <>
      <Header/>
    <div className="container home">
      <div className="homeleft">
        <div className="homelefttop">
          {subject.name}
            <hr/>
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
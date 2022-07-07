import { React, Fragment, useState, useEffect } from 'react'

import { Link } from "react-router-dom";
import {sub} from  "./Subjectlist";
import { subjectaction, changeaction } from "../../actions/landingAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
// import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from 'react-router-dom'



// function subfunction(database) {
//     // console.log(database);
//     // console.log("clicked")
//     // dispatch(subjectaction(database));

// }

function Subjects() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {message}= useSelector((state) => state.like);

   const subfunction = async(subject) => {
        // console.log(database);
        // console.log("clicked")
        await dispatch(changeaction(subject));
       
      await dispatch(subjectaction(subject.database));
    }




    return (
        <>

            {sub.map((subject, index) => {
                return (
                    <div className="subjectlink" onClick={()=>subfunction(subject)} key={index}>
                        <div className="subject">
                            <h6>{subject.name}</h6>
                        </div>
                    </div>
                )
            }
            )}
        </>
    )
}

export default Subjects






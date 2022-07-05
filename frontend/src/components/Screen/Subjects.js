import { React, Fragment, useState, useEffect } from 'react'

import { Link } from "react-router-dom";
import {sub} from  "./Subjectlist";
import { subjectaction } from "../../actions/landingAction";
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

   const subfunction = async(database) => {
        // console.log(database);
        // console.log("clicked")
      await dispatch(subjectaction(database));
    }




    return (
        <>

            {sub.map((subject, index) => {
                return (
                    <div className="subjectlink" onClick={()=>subfunction(subject.database)} key={index}>
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






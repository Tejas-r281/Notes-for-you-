import React, { Fragment, useState, useEffect } from "react";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";
//import { Redirect } from "react-router-dom";
import {pageaction} from "../../actions/landingAction";
function Showfiles() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keys, error = null, loading } = useSelector((state) => state.subject);
  //  console.log(keys)
  const getfiles=async(key)=>
  {
    await dispatch(pageaction(key));
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, keys, alert, loading]);

   const redirectToPdf=(key)=>
  {
    //window.location.href = `http:
// https://notes-app-for-you.herokuapp.com/

     window.location.href = `https://notes-app-for-you.herokuapp.com/api/v1/file/${key}`;
  }

  return (
    <>
      {loading ? <Loader /> :
        <div className="subjectlist">
          {keys && keys.map((subject, index) => {
            return (

              <div className="subjectbox" key={index}>
              {
                  //<Redirect to='http://localhost:5000/api/v1/file/${subject.key}'>

                    <div className="subject" onClick={()=>redirectToPdf(subject.key)}>
                      <h6>{subject.key}</h6>
                    </div>

                  //</Redirect>
              }
              </div>

            )

          }
          )}
        </div>
      }
    </>
  )
}

export default Showfiles
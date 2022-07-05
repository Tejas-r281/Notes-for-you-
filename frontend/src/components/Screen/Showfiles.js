import React, { Fragment, useState, useEffect } from "react";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
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

  return (
    <>
      {loading ? <Loader /> :
        <div className="subjectlist">
          {keys && keys.map((subject, index) => {
            return (
              // <div className="subjectbox" onClick={() => getfiles(subject.key)} key={index} >
              //   <div className="subject">
              //     <h6>{subject.key}</h6>
              //   </div>
              // </div>
              <div className="subjectbox" key={index}>
              {
                  <Link to={`/api/v1/file/${subject.key}`} key={index}>

                    <div className="subject">

                      <h6>{subject.key}</h6>
                    </div>

                  </Link>
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
import React, { Fragment, useState, useEffect } from "react";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";
//import { Redirect } from "react-router-dom";
import { pageaction, likeaction, subjectaction } from "../../actions/landingAction";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Landingcard from "./Landingcard.js";
function Showfiles() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keys, error = null, loading } = useSelector((state) => state.subject);
  //  console.log(keys)
  const {keys:likekeys,loading:likeloading,error:error1}= useSelector((state) => state.like);
  const { subject } = useSelector((state) => state.change);

  useEffect(() => {
    if (error ) {
      alert.error(error);
    }
    if(error1)
    {
      alert.error(error1);
      dispatch({type:"CLEAR_ERRORS"});
    }
  }, [dispatch, error, keys, alert,error1, loading,likekeys]);

  const redirectToPdf = (key) => {
    //window.location.href = `http:
    // https://notes-app-for-you.herokuapp.com/

    window.location.href = `https://notes-app-for-you.herokuapp.com/api/v1/file/${key}`;
  }
  const likesButton = async(key) => {
    // console.log(key)
    const data={
      key:key,
      subject:subject.database,
    }
   await dispatch(likeaction(data));
  //  console.log(likekeys)
     if(likekeys.message==="Already")
     {
        alert.success("Already Liked");
        // dispatch({type:"CLEAR_LIKES"});
        return;
     }
   await dispatch(subjectaction(subject.database))
  //  console.log(message);

  }

  return (
    <>
      {loading ? <Loader /> :
        <div className="subjectlist">
          { keys ? keys && keys.map((subject, index) => {
            return (

              <div className="subjectbox card" key={index}>
                {
                  <div className="card-body cardbody">

                      <p>{subject.description}</p>
                      <div className="bottom">
                      <div>
                        <FavoriteIcon onClick={()=>likesButton(subject.key)} /><span>{subject.likes.length}</span>
                      </div>

                      <button className="subject btn-success" onClick={() => redirectToPdf(subject.key)}>
                        <h6>View Pdf</h6>
                      </button>
                      </div>

                  </div>
                }
              </div>




            )

          }
          ) :
            <Landingcard />}
        </div>
      }
    </>
  )
}

export default Showfiles
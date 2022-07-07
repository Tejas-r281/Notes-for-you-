import React, { Fragment, useState, useEffect } from "react";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";
//import { Redirect } from "react-router-dom";
import { pageaction, likeaction, subjectaction, deleteFile,useraction } from "../../actions/landingAction";
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
function Showfiles(props) {

    // console.log(props);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { keys, error = null, loading } = useSelector((state) => state.subject);
  //  console.log(keys)
  const { keys: likekeys, loading: likeloading, error: error1 } = useSelector((state) => state.like);
  const { subject } = useSelector((state) => state.change);

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //   }
  //   if (error1) {
  //     alert.error(error1);
  //     dispatch({ type: "CLEAR_ERRORS" });
  //   }
  // }, [dispatch, error, keys, alert, error1, loading, likekeys]);

  const redirectToPdf = (key) => {
    //window.location.href = `http:
    // https://notes-app-for-you.herokuapp.com/

    window.location.href = `https://notes-app-for-you.herokuapp.com/api/v1/file/${key}`;
  }
  const deleteButton = async (key) => {
    // console.log(key)
    const data = {
      key: key,
      status:props.status,
    }
    await dispatch(deleteFile(data));
    await dispatch(useraction());
    //  console.log(likekeys)
    // if (likekeys.message === "Already") {
    //   alert.success("Already Liked");
    //   // dispatch({type:"CLEAR_LIKES"});
    //   return;
    // }
    // await dispatch(subjectaction(subject.database))
    //  console.log(message);

  }

  return (
    <>

        <div className="subjectlist1">



              <div className="subjectbox1 card" key={1}>
                {
                  <div className="card-body cardbody1">

                    <p>{subject.description}</p>
                    <div className="bottom">
                      <div className="actionbtn">
                  {props.status !== "accepted" ? <DeleteForeverIcon

                    onClick={() => deleteButton(props.subject)}
                  />:" "
                    }

                      </div>

                      <button className="subject btn-success" onClick={() => redirectToPdf(props.subject)}>
                        <h6>View Pdf</h6>
                      </button>
                    </div>

                  </div>
                }
              </div>








        </div>

    </>
  )
}

export default Showfiles
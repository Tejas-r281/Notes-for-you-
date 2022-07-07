import React from 'react'
import "./ListFile.css"
import SubjectCard from "./SubjectCard";
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { useraction } from "../../actions/landingAction";
import Loader from "../Layout/Loader/Loader";

function ListFile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keys, loading } = useSelector((state) => state.me);
  // console.log(keys);
  // const user = keys.user;
  // const accepted = user.accepted;
  // const rejected = user.rejected;
  // const pending = user.pending;
  // console.log(accepted)
  // console.log(rejected)
  // console.log(pending)
  useEffect(() => {
    // console.log("under testing mode")
    if(keys===undefined)
    {
      dispatch(useraction());
      return ;
    }

    // console.log(keys);
  }, [dispatch, keys, alert]);

  // console.log(keys);
  // const user = keys.user;
  // const accepted = user.accepted;
  // const rejected = user.rejected;
  // const pending = user.pending;
  // console.log(accepted)
  // console.log(rejected)
  // console.log(pending)


  return (
    <>
      {
        loading ? <Loader /> :
          <div className="status">
            <div className="pending shadow-lg p-3 mb-5 bg-white rounded">
              <h4 className="text-center text-primary">Pending</h4>
              <hr />
              {keys && keys.user.pending.map((subject, index) => {
                return (
                  <SubjectCard subject={subject} status="pending" key={index} />
                )
              })
              }


            </div>
            <div className="accepted shadow-lg p-3 mb-5 bg-white rounded">
              <h4 className="text-center text-success">Accepted</h4>
              <hr />
              {keys && keys.user.accepted.map((subject, index) => {
                return (
                  <SubjectCard subject={subject} status="accepted" key={index} />
                )
              })
              }
            </div>
            <div className="rejected shadow-lg p-3 mb-5 bg-white rounded">
              <h4 className="text-center text-muted">Rejected</h4>
              <hr />
              {keys && keys.user.rejected.map((subject, index) => {
                return (
                  <SubjectCard subject={subject} status="rejected" key={index} />
                )
              })
              }
            </div>
          </div>
      }
    </>
  )

}

export default ListFile
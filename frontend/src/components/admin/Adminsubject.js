import React from 'react'
import "./Adminsubject.css"
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import { deleteFile, pageaction, acceptfile, rejectfile, allkeysaction, admindeletefile } from '../../actions/landingAction'



function Adminsubject({status,subject}) {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {keys}= useSelector((state) => state.me);
    const isadmin=keys.user.role;

    const viewfiles= async(key) =>
        {
            // console.log("viewfiles");
        //    await dispatch(pageaction(key));
        window.location.href = `https://notes-app-for-you.herokuapp.com/api/v1/file/${key}`;
        }

    const acceptfiles = async(key) =>
        {
            // console.log("acceptfile");
            // console.log(key);
            if(isadmin!=="admin")
            {
                alert.error("तुम क्या कर रहे हो भाई?");
                return;
            }
           await dispatch(acceptfile(key));
        //    await dispatch(allkeysaction());
        }

    const rejectfiles = async(key) =>
        {
            // console.log(key);
            // console.log("rejectfile");
        if (isadmin !== "admin") {
            alert.error("तुम क्या कर रहे हो भाई?");
            return;
        }
           await dispatch(rejectfile(key));
        //    await dispatch(allkeysaction());
        }

    const deletefiles = async(key) =>
        {
        if (isadmin !== "admin") {
            alert.error("तुम क्या कर रहे हो भाई?");
            return;
        }
            // console.log("deletefile");
        const data = {
            key: key,

        }

            await dispatch(admindeletefile(data));
        }




    return (
        <>
            <div className="adminsubject">
                <div className="desc">
                  <p>{subject.description} </p>
                   <h6>{subject.uploadedBy.name}</h6>
                </div>


                 <button class="btn btn-primary" onClick={(e)=>viewfiles(subject.key)}>View File</button>

                {status !== "rejected" && status !== "accepted" ? <button class="btn btn-success" onClick={(e) => acceptfiles(subject.key)}>Accept</button> : ""}
                {status !== "rejected" && status !== "accepted" ? <button class="btn btn-secondary" onClick={(e) =>rejectfiles(subject.key)}>Reject</button> : ""}

                <button className="btn btn-danger" onClick={(e) => deletefiles(subject.key)}>Delete</button>
            </div>
        </>
    )
}
export default Adminsubject;
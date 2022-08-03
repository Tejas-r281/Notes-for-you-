
import "./Landingcard.css";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sub } from "./Subjectlist";
import { subjectaction, changeaction } from "../../actions/landingAction";

const Landingcard = () => {
    const dispatch = useDispatch();



    const subfunction = async (subject) => {
        // console.log(database);
        // console.log("clicked")
        await dispatch(changeaction(subject));

        await dispatch(subjectaction(subject.database));
    }
    return (
        <>
        <div className="frontpage">
                {sub.map((subject, index) => {
                    return (
                        <div className="frontcard shadow p-3 mb-5 bg-body rounded" key={index}>
                            <div className="frontcardname">
                                <h6>{subject.name}</h6>
                            </div>
                            <div className="frontcardlink" onClick={() => subfunction(subject)} key={index}>
                              View Notes
                            </div>
                        </div>
                    )
                }
                )}
        </div>

        </>
    )


}

export default Landingcard;
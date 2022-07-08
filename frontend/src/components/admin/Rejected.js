import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useAlert } from 'react-alert'
import Loading from '../../components/Layout/Loader/Loader'
import Adminheader from './Adminheader'
import Adminsubject from './Adminsubject.js'
import "./Pending.css";


function Rejected() {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, keys } = useSelector((state) => state.allkeys);
    // iterate over the keys and select all the keys which have status as pending

    return (
        <>
            <Adminheader />

            {loading ? <Loading /> :
                <div className="pendinglist container">
                    {keys && keys.map((subject, index) => {
                        if (subject.status === "rejected") {
                            return (
                                <Adminsubject key={index} status="rejected" subject={subject} />
                            )
                        }
                    }
                    )}

                </div>
            }


        </>
    )
}

export default Rejected
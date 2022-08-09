import React from 'react'
import Adminheader from './Adminheader'
import {useEffect} from 'react'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'

import {allkeysaction} from "../../actions/landingAction";
import Loading from '../../components/Layout/Loader/Loader'

function AdminLanding() {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading,keys} = useSelector((state) => state.allkeys);
    const {error}  =useSelector((state) => state.me);

    useEffect(() => {
        try {
             if(error)
             {
                    alert.show(error, { timeout: 5000 });
                    return;
             }

            dispatch(allkeysaction());
        }
        catch
        {
            alert("Error");
        }

    }, []);

    return (
        <>
        <Adminheader/>
        </>
    )
}
export default AdminLanding
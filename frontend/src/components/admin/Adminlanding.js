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

    useEffect(() => {
        try {
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
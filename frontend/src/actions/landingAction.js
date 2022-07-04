import {
    LANDING_REQUEST,
    LANDING_FAIL,
    LANDING_SUCCESS
} from "../constants/landingConstant";

import axios from "axios";
//recommendation list of users


export const landingaction =()=> async(dispatch) =>{
    try {
        dispatch({
            type: LANDING_REQUEST,
        });

        const res = await axios.get("/api/v1/getallkey");
        dispatch({
            type: LANDING_SUCCESS,
            payload: res.data,
        });
    }
    catch (err) {
        dispatch({
            type: LANDING_FAIL,
            payload: err.response.data.message,
        });

    }

}
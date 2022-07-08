import {
    LANDING_REQUEST,
    LANDING_FAIL,
    LANDING_SUCCESS,
    SUBJECT_REQUEST,
    SUBJECT_SUCCESS,
    SUBJECT_FAIL,
    CLEAR_ERRORS,
    PAGE_REQUEST,
    PAGE_SUCCESS,
    PAGE_FAIL,
    NEW_FILE_REQUEST,
    NEW_FILE_SUCCESS,
    NEW_FILE_FAIL,
    LIKE_REQUEST,
    LIKE_SUCCESS,
    LIKE_FAIL,
    SUBJECT,
    ME_REQUEST,
    ME_SUCCESS,
    ME_FAIL,
    DELETE_FILE_REQUEST,
    DELETE_FILE_SUCCESS,
    DELETE_FILE_FAIL,
    ALLKEYS_REQUEST,
    ALLKEYS_SUCCESS,
    ALLKEYS_FAIL,
    ACCEPT_REQUEST,
    ACCEPT_SUCCESS,
    ACCEPT_FAIL,
    REJECT_REQUEST,
    REJECT_SUCCESS,
    REJECT_FAIL,
    ADMIN_DELETE_REQUEST,
    ADMIN_DELETE_SUCCESS,
    ADMIN_DELETE_FAIL,



} from "../constants/landingConstant";

import axios from "axios";
//recommendation list of users


export const landingaction = () => async (dispatch) => {
    try {
        dispatch({
            type: LANDING_REQUEST,
        });

        const res = await axios.get("/api/v1/getallkey");
        dispatch({
            type: LANDING_SUCCESS,
            payload: res,
        });
    }
    catch (err) {
        dispatch({
            type: LANDING_FAIL,
            payload: err.response.data.message,
        });

    }

}

export const subjectaction = (dsa) => async (dispatch) => {
    try {
        dispatch({
            type: SUBJECT_REQUEST,
        });

        const res = await axios.get(`/api/v1/getallkeybysubject?subject=${dsa}`);
        dispatch({
            type: SUBJECT_SUCCESS,
            payload: res.data,
        });
    }
    catch (err) {
        dispatch({
            type: SUBJECT_FAIL,
            payload: err.response.data.message,
        });

    }

}

export const pageaction = (key) => async (dispatch) => {
    try {
        dispatch({
            type: PAGE_REQUEST,
        });
        // pass key by id
        const res = await axios.get(`/api/v1/file/${key}`);
        dispatch({
            type: PAGE_SUCCESS,
            payload: res.data,
        });
    }
    catch (err) {
        dispatch({
            type: PAGE_FAIL,
            payload: err.response.data.message,
        });

    }
}

export const createFile = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_FILE_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/v1/uploadfile`,
            productData,
            config
        );
        // console.log(data);
        dispatch({
            type: NEW_FILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_FILE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const likeaction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: LIKE_REQUEST,
        });
        // pass key by id
        const config = { headers: { "Content-Type": "application/json" } };
        // pass in the put request and key and subject as dbms
        const res = await axios.put(`/api/v1/likefile`, { data }, config);
        // const res = await axios.get(`/api/v1/like/${key}`);
        dispatch({
            type: LIKE_SUCCESS,
            payload: res.data,
        });

    }
    catch (err) {
        dispatch({
            type: LIKE_FAIL,
            payload: err.response.data.message,
        });

    }
}


export const changeaction = (subject) => async (dispatch) => {
    // console.log(subject);
    dispatch({
        type: SUBJECT,
        payload: subject,
    });


}


export const useraction = () => async (dispatch) => {
    try {
        dispatch({
            type: ME_REQUEST,
        });

        const res = await axios.get("/api/v1/me");
        dispatch({
            type: ME_SUCCESS,
            payload: res.data,
        });
    }
    catch (err) {
        dispatch({
            type: ME_FAIL,
            payload: err.response.data.message,
        });

    }

}

export const deleteFile = (data) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_FILE_REQUEST,
        });
        // console.log(data);
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.delete(`/api/v1/deletefile`,{data}, config);
        dispatch({
            type: DELETE_FILE_SUCCESS,
            payload: res.data,
        });
    }
    catch (err) {
        dispatch({
            type: DELETE_FILE_FAIL,
            payload: err.response.data.message,
        });

    }
}

export const allkeysaction=()=>async(dispatch)=>{
    try{
        dispatch({
            type:ALLKEYS_REQUEST,
        });
        const res=await axios.get("/api/v1/getallkey");
        dispatch({
            type:ALLKEYS_SUCCESS,
            payload:res.data,
        });
    }
    catch(err){
        dispatch({
            type:ALLKEYS_FAIL,

            payload:err.response.data.message,
        });

    }
}

export const acceptfile = (data) => async (dispatch) => {
    try {
        dispatch({
            type: ACCEPT_REQUEST,
        });
        console.log(data);
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.put(`/api/v1/acceptfile`, { data }, config);
        dispatch({
            type: ACCEPT_SUCCESS,
            payload: res.data,
        });
    }
    catch (err) {
        dispatch({
            type: ACCEPT_FAIL,
            payload: err.response.data.message,
        });

    }
}


export const rejectfile = (data) => async (dispatch) => {
    try {
        dispatch({
            type: REJECT_REQUEST,
        });
        // console.log(data);
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.put(`/api/v1/rejectfile`, { data }, config);
        dispatch({
            type: REJECT_SUCCESS,
            payload: res.data,
        });
    }
    catch (err) {
        dispatch({
            type: REJECT_FAIL,
            payload: err.response.data.message,
        });

    }
}

export const admindeletefile = (data) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_DELETE_REQUEST,
        });
        // console.log(data);
        const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.delete(`/api/v1/admin/deletefile`, { data }, config);
        dispatch({
            type: ADMIN_DELETE_SUCCESS,
            payload: res.data,
        });
    }
    catch (err) {
        dispatch({
            type: ADMIN_DELETE_FAIL,
            payload: err.response.data.message,
        });

    }
}







export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
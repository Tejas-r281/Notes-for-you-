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




export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
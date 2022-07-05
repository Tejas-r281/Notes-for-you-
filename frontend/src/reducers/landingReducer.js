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
    PAGE_FAIL
} from "../constants/landingConstant";



export const  landingreducer = (state = {}, action) => {
    switch (action.type) {
        case LANDING_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LANDING_SUCCESS:
            return {
                ...state,
                loading: false,
                keys: action.payload,
            };
        case LANDING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const subjectreducer = (state = {}, action) => {
    switch (action.type) {
        case SUBJECT_REQUEST:
            return {
                // ...state,
                loading: true,
            };
        case SUBJECT_SUCCESS:
            return {
                // ...state,
                loading: false,
                keys: action.payload.data,
            };
        case SUBJECT_FAIL:
            return {
                // ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const pagereducer= (state = {}, action) => {
    switch (action.type) {
        case PAGE_REQUEST:
            return {
                // ...state,
                loading: true,
            };
        case PAGE_SUCCESS:
            return {
                // ...state,
                loading: false,
                keys: action.payload.data,
            };
        case PAGE_FAIL:
            return {
                // ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
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
    NEW_FILE_RESET,
    LIKE_REQUEST,
    LIKE_SUCCESS,
    LIKE_FAIL,
    SUBJECT,
    ME_REQUEST,
    ME_SUCCESS,
    ME_FAIL,
    CLEAR_LIKES
} from "../constants/landingConstant";



export const landingreducer = (state = {}, action) => {
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
                success: false,
            };
        case SUBJECT_SUCCESS:
            return {
                // ...state,
                loading: false,
                keys: action.payload.data,
                success: true,
            };
        case SUBJECT_FAIL:
            return {
                // ...state,
                loading: false,
                error: action.payload,
                success: false,
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

export const pagereducer = (state = {}, action) => {
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

export const createfilereducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_FILE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case NEW_FILE_SUCCESS:
            return {
                ...state,
                loading: false,
                keys: action.payload,
                success: true,
            };
        case NEW_FILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };
        case NEW_FILE_RESET:
            return {
                ...state,
                success: false,
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

export const likereducer = (state = {}, action) => {
    switch (action.type) {
        case LIKE_REQUEST:
            return {

                loading: true,
                success: false,
            };
        case LIKE_SUCCESS:
            return {

                loading: false,
                keys: action.payload,
                success: true,
            };
        case LIKE_FAIL:
            return {

                loading: false,
                error: action.payload,
                success: false,
            };
        case CLEAR_LIKES:
            {
                return {
                
                    keys:null,
                }
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}

const subject = {
    name: "founder  of this website",
    database: "",
};


export const changereducer = (state = { subject }, action) => {
    switch (action.type) {

        case SUBJECT:
            return {
                ...state,
                // loading: false,
                subject: action.payload,
                // success: true,
            };

        default:
            return state;
    }
}

export const mereducer = (state = {}, action) => {
    switch (action.type) {
        case ME_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ME_SUCCESS:
            return {
                ...state,
                loading: false,
                keys: action.payload,
            };
        case ME_FAIL:
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
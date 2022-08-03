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
    CLEAR_LIKES,
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
    ADMIN_DELETE_FAIL

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
    name: "Lists Of All Subjects",
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
                success:true,
                keys: action.payload,
            };
        case ME_FAIL:
            return {
                ...state,
                loading: false,
                success:false,
                error: action.payload
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

export const deletereducer= (state = {}, action) => {
    switch (action.type) {
        case DELETE_FILE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_FILE_SUCCESS:
            return {
                ...state,
                loading: false,
                keys: action.payload,
            };
        case DELETE_FILE_FAIL:
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


export const allkeysreducer = (state = {}, action) => {
    switch (action.type) {
        case ALLKEYS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALLKEYS_SUCCESS:
            return {
                ...state,
                loading: false,
                keys: action.payload,
            };
        case ALLKEYS_FAIL:
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

export const  acceptreducer = (state = {}, action) => {
    switch (action.type) {
        case ACCEPT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ACCEPT_SUCCESS:
            return {
                ...state,
                loading: false,
                keys: action.payload,
            };
        case ACCEPT_FAIL:
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

export const rejectreducer = (state = {}, action) => {
    switch (action.type) {
        case REJECT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                keys: action.payload,
            };
        case REJECT_FAIL:
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

export const admindeletereducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADMIN_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                keys: action.payload,
            };
        case ADMIN_DELETE_FAIL:
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

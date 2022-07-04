import {
    LANDING_REQUEST,
    LANDING_FAIL,
    LANDING_SUCCESS
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
        default:
            return state;
    }
}


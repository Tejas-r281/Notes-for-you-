import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {
    userReducer,
    allUsersReducer,
    profileReducer,
    forgotPasswordReducer,
    sendEmailReducer,
    recommendationReducer
} from "./reducers/userReducer";
import
{
  landingreducer,
    subjectreducer,
    pagereducer,
    createfilereducer
} from "./reducers/landingReducer"
// import {
//     commentReducer,
//     allcommentReducer,
//     likeanddislikeReducer,
//     commentDetailReducer
// } from "./reducers/suggestionReducer";
// import {
//     deleteUserReducer
// } from "./reducers/adminReducer";


const reducer = combineReducers({
    // allUsers: allUsersReducer,
    // user: userReducer,
    // profile: profileReducer,
    // forgotPassword: forgotPasswordReducer,
    // sendEmail: sendEmailReducer,
    // recommendation: recommendationReducer,
    // comment: commentReducer,
    // allcomment: allcommentReducer,
    // likeanddislike: likeanddislikeReducer,
    // commentDetail: commentDetailReducer,
    // deleteUser: deleteUserReducer
    landing: landingreducer,
    subject: subjectreducer,
    page: pagereducer,
    createfile: createfilereducer

});


let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;


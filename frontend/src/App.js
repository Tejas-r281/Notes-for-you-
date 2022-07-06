import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import store from "./store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import LoginSignUp from "./components/User/LoginSignUp.js";
// import { getAllUsers, loadUser, getRecommendationAction } from "./actions/userAction.js";
// // import UserList from "./Component/Admin/UsersList.js";
// // import UpdateUser from "./component/Admin/UpdateUser.js";
// import StudentList from "./component/User/StudentList.js";
import NotFound from "./components/Layout/Notfound/NotFound.js";
// import UpdateStudent from "./component/User/UpdateStudent.js"
// import ForgotPassword from "./components/User/ForgotPassword.js";
// import ResetPassword from "./components/User/ResetPassword.js";
import Landing from "./components/Screen/Landing";
import Header from "./components/Screen/Header.js";
import Uploadpage from "./components/Screen/Uploadpage.js";
// import Recommendation from "./component/User/Recommendation.js";
// import Suggestion from "./component/User/Suggestion.js";
// import Profile from "./component/User/Profile.js";
// import ShowAll from "./component/Admin/ShowAll";
// import AdminLanding from "./component/Admin/AdminLanding.js"
// import { useSelector } from "react-redux";
// import {
//   // addcomment,
//   getallcomment
// } from "./actions/suggestionAction";
import {landingaction,subjectaction} from "./actions/landingAction";

function App() {
  //  const navigate1 = useNavigate();
  // const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    try {
      // store.dispatch(landingaction());
      // store.dispatch(subjectaction("dbms"));
    }
    catch
    {
      alert("Error");
    }


  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>

      <Routes>


        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/upload" element={<Uploadpage/>} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

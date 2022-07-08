import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import store from "./store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginSignUp from "./components/User/LoginSignUp.js";
// import { getAllUsers, loadUser, getRecommendationAction } from "./actions/userAction.js";
// // import UserList from "./Component/Admin/UsersList.js";
// // import UpdateUser from "./component/Admin/UpdateUser.js";
// import StudentList from "./component/User/StudentList.js";
import NotFound from "./components/Layout/Notfound/NotFound.js";
// import UpdateStudent from "./component/User/UpdateStudent.js"
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Landing from "./components/Screen/Landing";
import Header from "./components/Screen/Header.js";
import Uploadpage from "./components/Screen/Uploadpage.js";
import AdminLanding from "./components/admin/Adminlanding.js";
import Pending from "./components/admin/Pending";
import Rejected from "./components/admin/Rejected";
import Accepted from "./components/admin/Accepted";
// import { useSelector } from "react-redux";
// import {
//   // addcomment,
//   getallcomment
// } from "./actions/suggestionAction";
import {landingaction,subjectaction,useraction} from "./actions/landingAction";

function App() {
  //  const navigate1 = useNavigate();
  // const { keys } = useSelector((state) => state.me);
  const isadmin="admin";

  useEffect(() => {
    try {
      store.dispatch(useraction());
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
        <Route exact path="/loginsignup" element={<LoginSignUp/>} />
        <Route exact path="/password/forgot" element={<ForgotPassword/>} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        {isadmin==="admin" && <Route exact path="/admin" element={<AdminLanding/>} />}
        {isadmin==="admin" && <Route exact path="admin/pending" element={<Pending/>} />}
        {isadmin==="admin" && <Route exact path="admin/rejected" element={<Rejected/>} />}
        {isadmin==="admin" && <Route exact path="admin/accepted" element={<Accepted/>} />}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

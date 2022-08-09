import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../Layout/Loader/Loader.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  login,
  register,
  getAllUsers,
} from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated, success, done } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  // console.log("console.log(user)");
  // console.log(user);
  // // console.log("difference");
  // console.log("console.table(user)");
  // console.table(user);


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("password", password);
    // myForm.set("hostel", hostel);
    // myForm.set("change", change);
    // myForm.set("avatar", avatar);
    const myForm =
    {
      "name": name,
      "email": email,

      "password": password,

    };


    // console.log(myForm);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    // if (e.target.name === "avatar") {
    //   const reader = new FileReader();

    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setAvatarPreview(reader.result);
    //       setAvatar(reader.result);
    //     }
    //   };

    //   reader.readAsDataURL(e.target.files[0]);
    // } else {
    // var checked = false;
    // if (document.querySelector("#checkboxNoLabel:checked")) {
    //   checked = true;
    // }




    //  console.log(strUser);
    //   console.log(strUser1);



    // console.log(checked);
    setUser({ ...user, [e.target.name]: e.target.value });
    // }
  };
  // console.log(location);
  // const redirect = location.search ? location.search.split("=")[1] : "/account";
  //  console.log(redirect);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (done === true) {
      alert.show(`Please check SPAM FOLDER for Email Validatation`, { timeout: 5000 });
    }
    if (isAuthenticated) {
      // history.push(redirect);
      // dispatch(getAllUsers());
      // navigate("/students");
      navigate("/");
    }


  }, [dispatch, error, alert, navigate, success, done, location, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">


              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                className="loginForm"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="loginEmail">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <input
                    type="password"
                    placeholder="password >=8 digits"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="application/json"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>



                <div className="signUpPassword">
                  <input
                    type="password"
                    placeholder="password >=8 digits"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;

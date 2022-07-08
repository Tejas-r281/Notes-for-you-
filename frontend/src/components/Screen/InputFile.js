import React, { Fragment, useEffect, useState } from "react";
import "./newFile.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createFile ,useraction} from "../../actions/landingAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData.js";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import SideBar from "./Sidebar";
import { NEW_FILE_RESET } from "../../constants/landingConstant";
import { useNavigate } from "react-router-dom";
import { sub } from "./Subjectlist"
import {Link} from "react-router-dom";


const NewProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.createfile);

    const [linkedin, setlinkedin] = useState("");

    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("");

    const [pdf, setPdf] = useState([]);
    const [namePreview, setNamePreview] = useState([]);



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Your notes uploaded Successfully");
            // history.push("/admin/dashboard");
            navigate("/");
            dispatch(useraction());
            dispatch({ type: NEW_FILE_RESET });
        }
    }, [dispatch, alert, error, navigate, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const dataForm = new FormData();
        dataForm.append('file', pdf);
        dataForm.append('desc', description);
        dataForm.append('subject', subject);
        dataForm.append('linkedin', linkedin);
        dispatch(createFile(dataForm));
        setPdf([]);
        setNamePreview([]);
        setDescription("");
        setSubject("");
        // setlinkedin("");

    };

    const createFilePdfChange = (e) => {
        const file = e.target.files[0];
        // console.log(file.name);
        setPdf(file);
        setNamePreview(file.name);
    };

    return (
        <Fragment>

            <MetaData title="Add your notes" />

            <div className=" dashboard">
                <Link to="/">
                    <Button variant="contained" color="primary">
                        Home
                    </Button>
                </Link>
                <div className="newProductContainer">

                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Add your notes</h1>


                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder="Notes Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setSubject(e.target.value)}>
                                <option value="">Choose Subject</option>
                                {sub.map((cate) => (
                                    <option key={cate.id} value={cate.database}>
                                        {cate.name}
                                    </option>
                                ))}
                                required
                            </select>
                        </div>
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="file/*"
                                onChange={createFilePdfChange}
                                required
                            />

                        </div>

                        <div id="createProductFormImage">
                            {namePreview}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Upload Your Notes
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;

import React from 'react'
import {Link} from "react-router-dom";

const AdminHeader = () => {
    return (
        <><nav className="navbar container navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container-fluid">
            <Link to="/">
                <button className="btn btn-primary">Home</button>
            </Link>
            <Link to="/admin/accepted">
            <button className="btn btn-primary" >Accepted</button>
            </Link>
            <Link to="/admin/pending">
            <button className="btn btn-primary">Pending</button>
            </Link>

            <Link to="/admin/rejected">
            <button className="btn btn-primary">Rejected</button>
            </Link>

        </div>

        </nav></>
    )
    }
    export default AdminHeader
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

const Navbar = () => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res){
                if(res.status) window.location = "/login";
                else setUserInfo(res)
            }
        })
    })
    return(
        <div className="topnav theme-reverse topnav-shadow">
            <span className="topnav-brand">Blogging system</span>
            <span className="topnav-hamburger-menu" data-target = "myTopnav">&#x2630;</span>
            {userInfo?
            <div className="topnav-right" id="myTopnav">
                <Link className="topnav-item" to="/logout">Logout</Link>
            </div>
            :<div className="topnav-right" id="myTopnav">
                <Link className="topnav-item" to="/login">Login</Link>
                <Link className="topnav-item" to="/register">Register</Link>
            </div>}
        </div>
    )
}

export default Navbar;
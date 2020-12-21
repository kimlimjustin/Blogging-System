import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

const Login = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    
    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res && !res.status){
                window.location = "/";
            }
        })
    }, [])

    const LoginUser = e => {
        e.preventDefault();
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, {
            "email": inputEmail,
            "password": inputPassword
        })
        .then(res => {
            const token = new Cookies();
            token.set('token', res.data.token, {path: "/", maxAge: 604800})
            window.location = "/";
        })
        .catch(() => setErrorMessage("Something went wrong. Please try again."))
    }

    return(
        <div className="container">
            <form className="box box-shadow theme-reverse margin-top-bottom" onSubmit = {LoginUser}>
                <h1 className="box-title">Login</h1>
                <p className="red-text"><b>{errorMessage}</b></p>
                <div className="form-group">
                    <p className="form-label">Email:</p>
                    <input type = "email" className="form-control" value={inputEmail} onChange = {({target: {value}}) => setInputEmail(value)} required />
                </div>
                <div className="form-group">
                    <p className="form-label">Password:</p>
                    <input type = "password" className="form-control" value = {inputPassword} onChange = {({target: {value}}) => setInputPassword(value)} required />
                </div>
                <div className="form-group">
                    <p className="form-label">Don't have account yet? <Link to = "/register" className="link">Register</Link></p>
                    <input type = "submit" className="form-control theme-adjust" value="Login" />
                </div>
            </form>
        </div>
    )
}

export default Login;
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

const Register = () => {
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [toHome, setToHome] = useState(false);

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res && !res.status){
                setToHome(true)
            }
        })
    }, [])

    const RegisterUser = e => {
        e.preventDefault();
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, {
            "name": inputUsername,
            "password": inputPassword,
            "email": inputEmail
        })
        .then(res => {
            const token = new Cookies();
            token.set('token', res.data.token, {path: "/", maxAge: 604800})
            setToHome(true)
        })
        .catch(err => {setErrorMessage(err.response.data.message); console.log(err.response)});
    }

    return(
        <div className="container">
            {toHome? <Redirect to = "/" />: null}
            <form className="box box-shadow theme-reverse margin-top-bottom" onSubmit = {RegisterUser}>
                <h1 className="box-title">Register</h1>
                <p className="red-text"><b>{errorMessage}</b></p>
                <div className="form-group">
                    <p className="form-label">Username:</p>
                    <input type = "text" className="form-control" value={inputUsername} onChange = {({target: {value}}) => setInputUsername(value)} required />
                </div>
                <div className="form-group">
                    <p className="form-label">Email:</p>
                    <input type = "email" className="form-control" value = {inputEmail} onChange = {({target: {value}}) => setInputEmail(value)} required />
                </div>
                <div className="form-group">
                    <p className="form-label">Password:</p>
                    <input type = "password" className="form-control" value = {inputPassword} onChange = {({target: {value}}) => setInputPassword(value)} required />
                </div>
                <div className="form-group">
                    <p className="form-label">Already have account? <Link to = "/login" className="link">Login</Link></p>
                    <input type = "submit" className="form-control theme-adjust" value="Register" />
                </div>
            </form>
        </div>
    )
}

export default Register;
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

const Write = () => {
    const [inputTitle, setInputTitle] = useState('');
    const [inputContent, setInputContent] = useState('');
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res && !res.status) setUserInfo(res)
            else window.location = "/"
        })
    }, [])

    const SubmitPost = e => {
        e.preventDefault();
        const token = new Cookies().get('token');
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/create`, {token, creator: userInfo.email, title: inputTitle, blog: inputContent})
        .then(res => window.location = `/post/${res.data.id}`)
        .catch(err => console.log(err))
    }

    return(
        <div className="container">
            <form className="box box-shadow mt-5 theme-reverse"  onSubmit = {SubmitPost}>
                <h1 className="box-title">Create your post</h1>
                <div className="form-group">
                    <p className="form-label">Title:</p>
                    <input type="text" className="form-control" maxLength="300" placeholder="New post title here" value={inputTitle}
                    onChange = {({target: {value}}) => setInputTitle(value)} />
                </div>
                <div className="form-group">
                    <p className="form-label">Your content:</p>
                    <textarea placeholder="Write your content here...(markdown based)" className="form-control" rows="10" value={inputContent}
                    onChange = {({target: {value}}) => setInputContent(value)}></textarea>
                </div>
                <div className="form-group">
                    <input type = "submit" className="form-control btn theme-adjust" />
                </div>
            </form>
        </div>
    )
}

export default Write;
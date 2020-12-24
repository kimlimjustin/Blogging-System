import Axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

const EditPost = (params) => {
    const [inputTitle, setInputTitle] = useState('');
    const [inputContent, setInputContent] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res && !res.status) setUserInfo(res)
            else window.location = "/"
        })
    }, [])

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/get/${params.match.params.postId}`)
        .then(res => {
            setInputTitle(res.data.blog.title)
            setInputContent(res.data.blog.blog)
            setBlog(res.data.blog)
            if(res.data.creator.token !== new Cookies().get('token')) window.location = "/"
        })
    }, [params.match.params.postId])

    const Submit = e => {
        e.preventDefault();
        const token = new Cookies().get('token');
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/edit`, {token, creator: userInfo.email, title: inputTitle, content: inputContent, id: blog._id})
        .then(() => window.location = `/post/${blog._id}`)
    }
    return(
        <div className="container">
            <form className="box box-shadow mt-5 theme-reverse"  onSubmit = {Submit}>
            <h1 className="box-title">Edit post</h1>
                <div className="form-group">
                    <p className="form-label">Title:</p>
                    <input type="text" className="form-control" maxLength="300" placeholder="New post title here" value={inputTitle}
                    onChange = {({target: {value}}) => setInputTitle(value)} />
                </div>
                <div className="form-group">
                    <p className="form-label">Your content:</p>
                    <textarea placeholder="Write your content here...(markdown based)" className="form-control textarea-auto-adjust" rows="10" value={inputContent}
                    onChange = {({target: {value}}) => setInputContent(value)}></textarea>
                </div>
                <div className="form-group">
                    <input type = "submit" className="form-control btn theme-adjust" />
                </div>
            </form>
        </div>
    )
}

export default EditPost;
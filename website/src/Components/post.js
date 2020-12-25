import Axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import moment from "moment";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";
import { Link, Redirect } from "react-router-dom";

const Post = (params) => {
    const [post, setPost] = useState(null);
    const [creator, setCreator] = useState(null)
    const [userInfo, setUserInfo] = useState(null);
    const [toHome, setToHome] = useState(false)
    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res){
                if(res.status) window.location = "../login";
                else setUserInfo(res)
            }
        })
    }, [])

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/get/${params.match.params.postId}`)
        .then(res => {
            setPost(res.data.blog)
            setCreator(res.data.creator)
        })
    }, [params.match.params.postId])

    const deletePost = () => {
        if(window.confirm("Are you sure? this action cannot be undo" && userInfo)){
            const token = new Cookies().get("token")
            Axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs/delete`, {id: post._id, token, creator: userInfo.email})
            .then(() => setToHome(true))
        }
    }

    return(
        <div className="container">
            {toHome?<Redirect to = "/" />:null}
            {post !== null && creator !== null?
            <>
                <h1 className="blog-title my-3">{post.title}</h1>
                <p className="mb-5">posted by {creator.name} {moment(post.createdAt).fromNow()} 
                {creator.token === new Cookies().get("token")?
                <>
                <Link to = {`/post/${post._id}/edit`}><button className="btn theme-reverse">Edit</button></Link>
                <button className="btn btn-danger" onClick = {() => deletePost()}>Delete</button>
                </>:null}</p>
                <ReactMarkdown>{post.blog}</ReactMarkdown>
            </>
            :null}
        </div>
    )
}

export default Post;
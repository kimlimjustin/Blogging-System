import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const [toHome, setToHome] = useState(false);

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res){
                if(res.status) window.location = "/login";
                else setUserInfo(res)
            }else setToHome(true)
        })
    }, [])

    useEffect(() => {
        if(userInfo && userInfo._id){
            Axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/get_by_user/${userInfo._id}`)
            .then(res => setBlogs(res.data))
            .catch(err => console.log(err))
            }
    }, [userInfo])
    
    return(
        <div className="container my-5">
            {toHome?<Redirect to = "/" />:null}
            <h1 className="box-title">Your blogs:</h1>
            {blogs && blogs.map(blog => {
                return <Link to = {`/post/${blog._id}`}  key ={blog._id}><div className="col-4 theme-reverse m-2"><div className=" box box-shadow">{blog.title}</div></div></Link>
            })}
        </div>
    )
}

export default Dashboard
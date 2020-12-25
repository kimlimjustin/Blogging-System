import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [blogs, setBlogs]  = useState(null);
    useEffect(() => {
        Axios
          .get(`${process.env.REACT_APP_SERVER_URL}/blogs/get/all`)
          .then(res => setBlogs(res.data))
          .catch(err => console.error(err));
    }, [])
    return(
        <div className="container">
            <h1>Recent blogs:</h1>
            {blogs && blogs.map(blog => {
                return <Link to = {`/post/${blog._id}`}  key ={blog._id}><div className="col-4 theme-reverse m-2"><div className=" box box-shadow">{blog.title}</div></div></Link>
            })}
        </div>
    )
}

export default Home;
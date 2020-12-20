import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

const Home = () => {
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
        <div className="container">Hello World</div>
    )
}

export default Home;
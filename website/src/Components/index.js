import Axios from "axios";
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
        Axios
          .get(`${process.env.REACT_APP_SERVER_URL}/blogs/get/all`)
          .then(res => console.log(res.data))
          .catch(err => console.error(err));
    }, [])
    return(
        <div className="container">
            
        </div>
    )
}

export default Home;
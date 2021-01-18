import React, { useContext, useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import './Assets/Login.css'
import { UserContext } from '../../UserContext'
import Cookie from 'js-cookie'


// import graph from 'fb-react-sdk';
import FacebookLogin from 'react-facebook-login';
import Axios from 'axios';
import { defaulturl } from '../../API_And_FUNCTIONS/Config';



function Login() {
    const { } = useContext(UserContext)
    const history = useHistory()
    const [user, setUser] = useState(localStorage.getItem("fb_token") ? localStorage.getItem("fb_token") : 0);

    const [click, setClick] = useState(false)
    const responseFacebook = (response) => {
        console.log(response);
        Authentication(response)

        // if (response&&response.status === "connected") {
        //     console.log("connected")
        // }
        // else {
        //     alert("Login error")
        // }

    }

    const Authentication = (login_data) => {
        console.log(login_data)
        var data = new FormData();
        data.append('email', login_data.email);
        data.append('first_name', login_data.accessToken);
        data.append('last_name', login_data.name);
        data.append('username', login_data.id);


        var config = {
            method: 'post',
            url: defaulturl + 'user/auth/',
            headers: {
            },
            data: data
        };


        Axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                console.log(response.data.token)
                localStorage.setItem("fb_token", response.data.token)
                // history.push('/')
                // window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    return (

        <div className="loginContainer">
            {!user ? (
                <div className="loginSection">
                    <FacebookLogin
                        appId="476066130419659"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        onClick={() => setClick(true)}
                    />
                    <br />
                    {click && <div style={{ cursor: "pointer", color: "blue" }} onClick={() => window.location.reload()}>click here is not redirect automatically</div>}
                </div>
            ) :
                <Redirect to="/" />
            }

        </div >


    )
}

export default Login

import React, { useState, useContext, useEffect } from 'react'
import Footer from '../../CoreComponents/Footer'
import Header from '../../CoreComponents/Header'
import './Assets/css/Home.css'

// import functions and apis from API_And_Functions
import { api_get_data, api_post_data } from '../../API_And_FUNCTIONS/API'
// import {apiCall} from '../../API_And_FUNCTIONS/Functions'

import { UserContext } from '../../UserContext'
import Axios from 'axios'
import { defaulturl } from '../../API_And_FUNCTIONS/Config'

function Home() {
    const [nav, setNav] = useState(
        [
            { id: 1, name: "Dashboard", active: false },
            { id: 2, name: "Website", active: false },
            { id: 3, name: "Visitors", active: false },
            { id: 4, name: "Reviews", active: false },
            { id: 5, name: "Listings", active: true },
            { id: 6, name: "Appoinments", active: false },
            { id: 7, name: "Settings", active: false },
        ]
    )

    const { data, name } = useContext(UserContext)

    const [msg, setMsg] = useState()
    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    const [listUsers, setlistUsers] = useState([])

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = () => {

        var config = {
            method: 'get',
            url: defaulturl + 'user/auth/',
            headers: {
            },
        };

        Axios(config)
            .then(function (response) {

                console.log(response.data);
                setlistUsers(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const apiCall = async () => {
        // const dat = await api([{ urlParams: '/todos/1', image: [{ id: 1, img: 1 }, { id: 2, img: 2 }, { id: 3, img: 3 },] }])
        const dat = await api_get_data('/todos/1')
        data[1](dat)
    }

    const apiPostCall = async () => {
        var formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('userId', 1);
        const postResponse = await api_post_data('/posts', formData)
        console.log(postResponse)
    }

    return (
        <>
            <div className="homeContainer">
                <div className="ch-home header">
                    <div className="ch-header logo">GROWTH PLUG</div>
                    <div className="ch-header header-bar">
                        <button className="btn btn-primary" onClick={() => { localStorage.removeItem('fb_token'); window.location.reload() }}>Logout</button>
                    </div>
                </div>
                <div className="ch-home mid">
                    <div className="ch-mid left-nav">
                        {nav.map((item, index) => <div className={`left-nav-items ${item.active && "active"}`}
                            onClick={() => alert("This feature is not available")}
                        >&nbsp;&nbsp;{item.name}</div>

                        )}
                    </div>
                    <div className="ch-mid bodydata">
                        <div className="bodydata-table">
                            <div className="body-label">Listings</div>
                            <table class="table table-hover" >
                                <thead className="thead-light">
                                    <tr>

                                        <th scope="col"></th>
                                        <th scope="col">Source</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Rating</th>
                                        <th scope="col">Listed</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUsers.map((item, index) => {
                                        return <tr key={index}>

                                            <td>{item.id}</td>
                                            <td>Google</td>
                                            <td>{item.last_name}</td>
                                            <td>{item.email}</td>

                                            <td>{item.username}</td>
                                            <td>3/5</td>
                                            <td>Yes</td>
                                            <td><i className="fa fa-trash" ></i></td>
                                            <td><button className="btn btn-primary">Update</button></td>
                                        </tr>
                                    })}

                                    <tr>

                                        <td>TEST </td>
                                        <td>ROW</td>
                                        <td>ABC Dental</td>
                                        <td>2012 California</td>
                                        <td>9898989898</td>
                                        <td>3/5</td>
                                        <td>Yes</td>
                                        <td>True</td>
                                        <td><button className="btn btn-primary">Update</button></td>

                                    </tr>

                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>

                {/* <div className="ch-home footer">Footer</div> */}
            </div>


            {/* <Header />

            <div className="homeContainer">
                Home
                <button onClick={() => { apiCall() }}>
                    API get call
                </button>
                {data[0] && <h1>{data[0].title}</h1>}
                <div>
                    <input placeholder="Your name" onChange={(e) => setMsg(e.target.value)} />
                    <button onClick={() => { name[1](msg); alert('Your name added to context') }}>add to context</button>
                </div>

                <div style={{ padding: 5, border: 'solid', display: 'flex', flexDirection: 'column' }}>
                    <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
                    <input placeholder="body" onChange={(e) => setBody(e.target.value)} />

                    <button onClick={() => { apiPostCall() }}>Post this via api</button>
                </div>

            </div>

            <Footer /> */}
        </>

    )
}

export default Home

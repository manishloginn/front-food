import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";


function AdminLogin() {

    const apiUrl = useSelector((e) => e.url)

    const [error, setError] = useState('');
    const [data, setData] = useState({
        username: '',
        password: '',
    });


    const navigate = useNavigate();
 
            const formHandel = async  (e) => {
                e.preventDefault()
                console.log('hit')
         
                try { 
                    const res = await axios.post(`${apiUrl}/adminDone`, 
                        { username: data.username, password: data.password },  
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true // This is important
                        })

                        let respo = Cookies.get()
                        console.log(respo)

                        console.log(res.data)
                        if (res.status === 200) {
                            navigate("/admin/Dashboard");
                        } else {
                            setError('Invalid login credentials');
                        }
         
                } catch (err) {
                    setError('An error occurred. Please try again later.');
                    console.log(err);
                }
            }
         
        
    const handelchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={formHandel} style={{ position: 'absolute', top: "0", left: '0', width: "100vw", height: "100vh" }} >

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Login </h1>
                <Link to='/' style={{ cursor: "pointer", color: "grey" }}><HomeOutlinedIcon style={{ fontSize: "50px" }} /></Link>
            </div>
            <br />

            <label>
                Username:
                <input type="text" name="username" id="username" value={data.username} onChange={handelchange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" id="password" value={data.password} onChange={handelchange} />
            </label>
            <br />
            <div>
                <button type="submit">Submit</button>
                <Link to='/admin/register' style={{ marginLeft: "10px" }}>Don't have an account?</Link>
            </div>
        </form>
    )
}

export default AdminLogin;

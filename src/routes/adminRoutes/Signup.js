import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function Signup() {
    const [data, setData] = useState({
        username: '',
        password: '',
        address: '',
        restrauntName: '',
    });

    const navigate = useNavigate(); 

    const SignupHandle = (e) => {
        e.preventDefault();
        axios.post('/adminRegister', data) 
            .then((res) => {
                if (res.status === 201) {
                    setData({
                        username: '',
                        password: '',
                        address: '',
                        restrauntName: '',
                    });
                    navigate("/admin/login"); 
                }
            })
            .catch((err) => {
                console.log(err.response?.data?.message || err.message); // Use optional chaining to avoid errors if the response doesn't have the expected structure
            });
    };

    const handelchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={SignupHandle} style={{ position: 'absolute', top: "0", left: '0', width: "100vw", height: "100vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Sign Up </h1>
                <Link to='/' style={{ cursor: "pointer", color: "grey" }}><HomeOutlinedIcon style={{ fontSize: "50px" }} /></Link>
            </div>
            <br />

            <label>
                Username:
                <input type="text" name="username" id="username" value={data.username} onChange={handelchange} />
            </label>
            <br />
            <label>
                Restaurant Name:
                <input type="text" name="restrauntName" id="restrauntName" value={data.restrauntName} onChange={handelchange} />
            </label>
            <br />
            <label>
                Restaurant Address:
                <br />
                <input style={{ width: "70vw", height: "20vh" }} type="text" name="address" id="address" value={data.address} onChange={handelchange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" id="password" value={data.password} onChange={handelchange} />
            </label>
            <br />
            <div>
                <button type="submit">Submit</button>
                <Link to='/admin/login' style={{ marginLeft: "10px" }}>Already have an account?</Link>
            </div>
        </form>
    );
}

export default Signup;

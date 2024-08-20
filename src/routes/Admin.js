import React from 'react'
import {  Link } from 'react-router-dom';


function Admin() {

    return (
        <>
            <div>
                <h1>Welcome to Our Website</h1>
                <p>Click below to login or sign up:</p>
                <Link to="/admin/login">
                    <button>Login</button>
                </Link>
                <Link to="/admin/register" style={{ marginLeft: '10px' }}>
                    <button>Signup</button>
                </Link>
            </div>
        </>

    )
}

export default Admin

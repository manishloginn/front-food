import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import "./navbar.css"
import SensorOccupiedTwoToneIcon from '@mui/icons-material/SensorOccupiedTwoTone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

function CartNav() {

    const [register, SetRegister] = useState(false)
    const [Login, SetLogin] = useState(false)



    return (

        <>
          <div className=" navbar navbar-expand-lg navbar-light bg-light">
                <nav style={{width:"90vw", margin:"auto"}} className='navbar navbar-expand-lg navbar-light bg-light' >
                    <div>
                        <Link className="navbar-brand" to="/">Food App</Link>
                    </div>
                   
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link fs-5" >Secure Checkout </a>
                            </li>
                        </ul>
                    </div>
                    <div style={{display: "flex", justifyContent:"center", alignItems:"center", gap:"30px"}}>
                        {/* <button onClick={() => SetLogin((prev) => !prev)} >Login</button> */}
                        {/* <button btn  onClick={() => SetRegister((prev) => !prev)}>Sign Up</button> */}
                        <div style={{cursor:"pointer"}} onClick={() => SetRegister((prev) => !prev)} >
                            < SensorOccupiedTwoToneIcon style={{ fontSize: "40px" , color:"grey"}} /> <span>Sign IN</span>
                        </div>
                        <div style={{cursor:"pointer"}}>
                           <HelpOutlineIcon style={{ fontSize: "40px" , color:"grey"}} /> <span>Cart</span>
                        </div>
                        <div style={{cursor:"pointer"}} onClick={() => SetLogin((prev) => !prev)}>
                           <LoginOutlinedIcon style={{ fontSize: "40px" , color:"grey"}} /> <span>Login</span>
                        </div>
                    </div>
                </nav>
                </div>
          

            {
                register &&
                <div className="App">

                    <form method="post" action='/registerUser' >
                        <p className='span' onClick={() => SetRegister((prev) => !prev)} >X</p>
                        <br />
                        <label>
                            Username:
                            <input type="text" name="username" id="username" />
                        </label>
                        <br />
                        <label>
                            Name:
                            <input type="text" name="name" id="name" />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input type="email" name="email" id="email" />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" name="password" id="password" />
                        </label>
                        <br />
                        <label>
                            Contact:
                            <input type="text" name="contact" id="contact" />
                        </label>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>

            }

            {
                Login &&
                <div className="App">
                    <form method="post" action='/loginUser' >
                        <p className='span' onClick={() => SetLogin((prev) => !prev)} >X</p>
                        <br />
                        <label>
                            Username:
                            <input type="text" name="username" id="username" />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" name="password" id="password" />
                        </label>
                        <br />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            }


            <Outlet />




        </>
    )
}

export default CartNav

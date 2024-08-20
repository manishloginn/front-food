import React, { useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import "./navbar.css"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SensorOccupiedTwoToneIcon from '@mui/icons-material/SensorOccupiedTwoTone';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import useSelection from 'antd/es/table/hooks/useSelection';
import { useSelector } from 'react-redux';


function Navbar() {

    const [register, SetRegister] = useState(false)
    const [Login, SetLogin] = useState(false)

    const cartData = useSelector((e) => e.cart)

    const cartItem = cartData.length

    const navigate = useNavigate()




    return (

        <>
          <div className="navbar navbar-expand-lg navbar-light bg-light">
                <nav style={{width:"90vw", margin:"auto"}} className='navbar navbar-expand-lg navbar-light bg-light' >
                    <div>
                        <Link className="navbar-brand" to="/">Food App</Link>
                    </div>
                    <div>
                        <Link className="navbar-brand" style={{ fontWeight: "100px" }} to="/admin"><SupervisorAccountOutlinedIcon /></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/about">About </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div style={{display: "flex", justifyContent:"center", alignItems:"center", gap:"30px"}}>
                        {/* <button onClick={() => SetLogin((prev) => !prev)} >Login</button> */}
                        {/* <button btn  onClick={() => SetRegister((prev) => !prev)}>Sign Up</button> */}
                        <div style={{cursor:"pointer"}} onClick={() => SetRegister((prev) => !prev)} >
                            < SensorOccupiedTwoToneIcon style={{ fontSize: "40px" , color:"grey"}} /> <span>Sign Up</span>
                        </div>
                       
                        <div onClick={() => navigate('/cart') } style={{cursor:"pointer", display:"flex"}}>

                            {
                                cartItem === 0? 
                                "":<p className='cartNumber'>{cartItem}</p>
                            }
                            
                            <AddShoppingCartIcon style={{ fontSize: "40px", color:"grey" }} /> <Link className="nav-link" to="/cart">Cart</Link>
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

export default Navbar

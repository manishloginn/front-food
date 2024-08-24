import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './routes/Navbar';
import Home from './routes/Home';
import Contact from './routes/Contact';
import About from './routes/About';
import Admin from './routes/Admin';
import Productadd from './routes/Productadd';
import axios from 'axios';
import {  useDispatch } from 'react-redux';
import { Action } from './store/action';
import AdminLogin from './routes/adminRoutes/Login';
import Signup from './routes/adminRoutes/Signup';
import Cart from './routes/Cart';


const apiUrl = 'https://foodworld-nine.vercel.app';
// const apiUrl = 'http://localhost:5000';



function App() {


  const dispatch = useDispatch();


  useEffect(() => {
    const fetchProducts = async () => {
      // ${apiUrl}
      try {
        const response = await axios.get(`${apiUrl}/getProduct`);
        console.log(response.data)
        dispatch({ type: Action.ALLDATA, payload: response.data })
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);






  return (

    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<Signup />} />
            <Route path='/admin/Dashboard' element={<Productadd />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;

// import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./home.css"
import { Action } from '../store/action'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import { motion, useScroll } from "framer-motion"

// const apiUrl = 'https://foodworld-nine.vercel.app';
// const apiUrl = 'http://localhost:5000';

function Home() {



  // const [data, setdata] = useState([])

  const allData = useSelector((e) => e.data)
  const cartData = useSelector((e) => e.cart)
  const apiUrl = useSelector((e) => e.url)
  // const totalPrice = useSelector((e) => e.totalprice)
  const dispatch = useDispatch()

  console.log(apiUrl)

  // setdata(allData)
  const haldelcart = (item) => {
    const itemExists = cartData.some((e) => item._id === e._id);
    if (itemExists) {
      alert('Already in cart');
      // console.log(item.price)
    } else {
      // console.log(item.price)
      dispatch({ type: Action.CART, payload: { data: item, totalamount: item.price } });
    }
  }





  // console.log(data)



  return (
    <>
      {/* <motion.div style={{ scaleX: scrollYProgress }} ></motion.div> */}
      <div className='homeproduct'>
        {(!allData || allData.length === 0) ?
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
          : allData.map((item, i) => {
            return (
              <>
                <div className='productItem' key={item._id}>
                  <div className='restrname' key={item.restrauntName}>
                    <p>By {item.restrauntName}</p>
                    <hr />
                  </div>
                  <div className='lowersection' key={item.name}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                      <img src={`${item.image}`} alt={item.image}></img>
                      <button onClick={() => haldelcart(item)} style={{ marginTop: "-20px", border: "1px solid grey", width: "100px", background: "white", color: "green", fontWeight: "800", fontSize: "20px" }}>ADD</button>
                    </div>

                    <div className='otherside'>
                      <p className='name'>{item.name}</p>
                      <h5> ₹{item.price}</h5>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
      </div>
    </>
  )

}

export default Home

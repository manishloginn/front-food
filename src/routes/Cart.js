// Cart.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./cart.css";
import CartNav from './cartNav';
import { Action } from '../store/action';
import { Button, Empty, Typography } from 'antd';
import { Link } from 'react-router-dom';


function Cart() {
    const cartData = useSelector((e) => e.cart);
    const totalPrice = useSelector((e) => e.totalprice);
    const dispatch = useDispatch();

    const increment = (itemId) => {
        dispatch({ type: Action.INCREMENT_QUANTITY, payload: itemId });
    };

    const decrement = (itemId) => {
        dispatch({ type: Action.DECREMENT_QUANTITY, payload: itemId });
    };

    console.log(cartData.length)

    return (
        <div className='cartComponent'>
            <div className='insideComponent'>
                <CartNav />

                {
                    cartData && cartData.length < 1 ?
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            imageStyle={{ height: 60 }}
                            description={
                                <Typography.Text>
                                    Cart is Empty <Link to="/">Add Now</Link>
                                </Typography.Text>
                            }
                        >
                        </Empty>
                        : <div className='uppercartindex'>
                            <div className='cartindex'>
                                {cartData && cartData.map((item) => (
                                    <div className='productItem' key={item._id}>
                                        <div className='restrname'>
                                            <p>By {item.restrauntName}</p>
                                            <hr />
                                        </div>
                                        <div className='lowersection'>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                                <img src={`http://localhost:5000/${item.image}`} alt={item.name}></img>
                                                <div className='upperbtndiv'>
                                                    <button onClick={() => decrement(item._id)}>-</button>
                                                    <span style={{ textAlign: "center", margin: 'auto', fontSize: "20px", width: "200px" }}>{item.quantity}</span>
                                                    <button onClick={() => increment(item._id)}>+</button>
                                                </div>
                                            </div>
                                            <div className='otherside'>
                                                <p className='name'>{item.name}</p>
                                                <h5> ₹{parseFloat(item.price) * item.quantity}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h1>Total Price: ₹{totalPrice}</h1>
                        </div>
                }


            </div>
        </div>
    );
}

export default Cart;

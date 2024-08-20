// reducer.js
import { Action } from "./action";

const initialState = {
    data: [],
    AdminData: null,
    cart: [],
    totalprice: 0
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.ALLDATA:
            return { ...state, data: action.payload };

        case Action.AdminData:
            return { ...state, AdminData: action.payload };

        case Action.CART:
            const item = action.payload.data;
            const existingItemIndex = state.cart.findIndex(e => e._id === item._id);

            if (existingItemIndex >= 0) {
                // Item already in cart, update its quantity
                const updatedCart = state.cart.map((e, index) => {
                    if (index === existingItemIndex) {
                        return {
                            ...e,
                            quantity: e.quantity + 1
                        };
                    }
                    return e;
                });

                const newTotalPrice = updatedCart.reduce((acc, curr) => acc + (parseFloat(curr.price) * curr.quantity), 0);

                return {
                    ...state,
                    cart: updatedCart,
                    totalprice: newTotalPrice
                };
            } else {
                // Item not in cart, add it with an initial quantity of 1
                const newCartItem = {
                    ...item,
                    quantity: 1
                };

                const newTotalPrice = state.totalprice + parseFloat(item.price);

                return {
                    ...state,
                    cart: [...state.cart, newCartItem],
                    totalprice: newTotalPrice
                };
            }

        case Action.INCREMENT_QUANTITY:
            const incrementItem = state.cart.find(e => e._id === action.payload);
            if (incrementItem) {
                const updatedCartForIncrement = state.cart.map(e =>
                    e._id === action.payload ? { ...e, quantity: e.quantity + 1 } : e
                );
                const newTotalPriceIncrement = updatedCartForIncrement.reduce((acc, curr) => acc + (parseFloat(curr.price) * curr.quantity), 0);
                return {
                    ...state,
                    cart: updatedCartForIncrement,
                    totalprice: newTotalPriceIncrement
                };
            }
            return state;

        case Action.DECREMENT_QUANTITY:
            const decrementItem = state.cart.find(e => e._id === action.payload);
            if (decrementItem && decrementItem.quantity > 1) {
                const updatedCartForDecrement = state.cart.map(e =>
                    e._id === action.payload ? { ...e, quantity: e.quantity - 1 } : e
                );
                const newTotalPriceDecrement = updatedCartForDecrement.reduce((acc, curr) => acc + (parseFloat(curr.price) * curr.quantity), 0);
                return {
                    ...state,
                    cart: updatedCartForDecrement,
                    totalprice: newTotalPriceDecrement
                };
            } else if (decrementItem && decrementItem.quantity === 1) {
                // Remove item from cart if quantity is zero
                const updatedCartForDecrement = state.cart.filter(e => e._id !== action.payload);
                const newTotalPriceDecrement = updatedCartForDecrement.reduce((acc, curr) => acc + (parseFloat(curr.price) * curr.quantity), 0);
                return {
                    ...state,
                    cart: updatedCartForDecrement,
                    totalprice: newTotalPriceDecrement
                };
            }
            return state;

        default:
            return state;
    }
};

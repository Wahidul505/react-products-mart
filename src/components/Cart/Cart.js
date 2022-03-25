import React from 'react';
import './Cart.css';

const Cart = ({cart, clearCart}) => {
    const totalQuantity = cart.reduce((previous,next)=> previous + next.quantity,0)
    const totalPrice = cart.reduce((previous,next)=>previous + (next.price * next.quantity),0);
    const tax = parseFloat((totalPrice * 0.05).toFixed(2));
    const grandTotal = totalPrice + tax;
    return (
        <div>
            <h3>Cart</h3>
            <hr />
            <h4>Added Product</h4>
            <p>{totalQuantity}</p>
            <hr />
            <h4>Total Price</h4>
            <p>Tk {totalPrice}</p>
            <hr />
            <h4>Tax</h4>
            <p>Tk {tax}</p>
            <hr />
            <h3>Grand Total</h3>
            <p>Tk {grandTotal}</p>
            <button onClick={clearCart} className='clr-btn'>Clear Cart</button>
        </div>
    );
};

export default Cart;
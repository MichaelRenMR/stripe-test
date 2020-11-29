import React from 'react';
import Product from './Prod';
import CartContext from './CartContext';
import './App.css';
import Image from './Image';
import { privateEncrypt } from 'crypto';

const CartRow = (props:any) => {
    const [price_amount, quantity, product_name, product_image] = props.value;
    
    const {cart, addToCart, removeFromCart } = React.useContext(CartContext);

    console.log("Product image", product_image)

    return (
        <div className="cart-entry">
            <img className="cart-pic" src={product_image} alt={product_name}/>
            <div className="cart-info">
                <h3> {product_name} x{quantity} </h3>
                <p> {(price_amount / 100).toFixed(2)} </p>
            </div>
        </div>
    );

}

export default CartRow;
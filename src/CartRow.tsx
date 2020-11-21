import React from 'react';
import Product from './Prod';
import CartContext from './CartContext';
import './App.css';
import Image from './Image';

const CartRow = (props:any) => {

    const [product, quantity] = props.value;
    
    const { cart, addToCart, removeFromCart } = React.useContext(CartContext);


    return (
        <div>
            <img src={product.images[0]} alt={product.name} style={{height:"80px", width:"80px", objectFit:"cover"}}/>
            <h3> {product.name}: {quantity} </h3>
        </div>
    );
}

export default CartRow;
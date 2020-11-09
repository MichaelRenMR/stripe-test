import React from 'react';
import Product from './Prod';
import CartContext from './CartContext';
import './App.css';

const Cart = () => {

  const {cart, addToCart} = React.useContext(CartContext);

  return (     
    <div>
        {cart.map((item:any) => (<h3>{item}</h3>))}
    </div>
  );
}

export default Cart;


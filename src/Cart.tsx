import React from 'react';
import Product from './Prod';
import CartContext from './CartContext';
import './App.css';

const Cart = () => {

  const {cart, addToCart} = React.useContext(CartContext);
  console.log(cart); 
  return (     
    <div>
      {Object.entries(cart).map((key:any, value) => {return (<h3>{"jajajajaaja"}</h3>)})}
    </div>
  );
}

export default Cart;

//        {/* {Object.keys(cart).map(function(key:any, index) {return <h3>{key.name}</h3>})} */}

//        {cart.map((item:any) => (<h3>{item.name}</h3>))}

// Object.keys(cart).map(function(key, index) {
//   <h3>{key.name}</h3>
// });

// Object.keys(cart).map(function(key, index) {
//   myObject[key] *= 2;
// });

// Object.keys(cart).forEach(function (key) {
//   var value = cart[key];
//   newObject[key] = value * value;
// });


// 
// Object.entries(cart)
//   .map(([key, value]) => <h3>{key}</h3>)


//   Object.entries({ key: 'value' })
//     .map(keyValuePair => `${keyValuePair[0]}: ${keyValuePair[1]}`)




import React from 'react';
import Product from './Prod';
import CartContext from './CartContext';
import './App.css';

const Cart = () => {

  const {cart, addToCart, removeFromCart} = React.useContext(CartContext);
  console.log("Cart.tsx: ");
  console.log(cart); 

  const allProducts = () => {
    let productString = ""; 
    for (let [key, value] of Array.from(cart.entries())) {
      console.log(key + ' = ' + value)
      productString = productString + " " + value[0].name + "=" + value[1] + "\n";
    }
    return productString;
  }

  return (     
    <div>
      <h3>{allProducts()}</h3>
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


// function showCart(value:any, key:any, map: any) {
//   return (
//     <div>
//       {key} {value}
//     </div>
//   )
// }




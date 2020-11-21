import React from 'react';
import Product from './Prod'; 
import CartContext from './CartContext';
import Cart from './Cart'; 
import './App.css';
import cartimage from './img/cart-img.png';
import Image from './Image'; 

const App = () => {
  const [cart, setCart] = React.useState<any>(new Map()); // using map instead of object now

  // key: price.id 
  // value: [priceObject, quantity, product.name, product.image]
  const updateCart = (k:string,v:any) => {  
    /* 
    React checks if a component should update by checking if the object before is different from the object after.
    To force it to update we need to put the old info in a new map so that the objects pass the difference check. 
    */
    cart.set(k,v); 

    if (cart.get(k)[1] === 0) {
      cart.delete(k);
    }
    
    let newCart = new Map(cart); 
    setCart(newCart); 
  }

  const addToCart = (product: any) => {
    let prod_id:string = product.id; 
    if (cart.has(prod_id)) {
      var oldQuantity = cart.get(prod_id)[1];
      updateCart(prod_id, [product, oldQuantity + 1]); 
    } else {
      updateCart(prod_id, [product, 1]);
    }
  }

  const removeFromCart = (product: any) => {  //if item quantity = 0, remove key
    let prod_id: string = product.id;
    if (cart.has(prod_id)) {
      var oldQuantity = cart.get(prod_id)[1];
      updateCart(prod_id, [product, oldQuantity - 1]);
    }
  }


  //cart provider keeps track of state
  return (
    <div className="App">
      <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
        <input type="checkbox" id="cart-checkbox"/>
        <label htmlFor="cart-checkbox"><img id="cart-img" src={cartimage}/></label>
        <div id="checkout-sidebar">
          {/* //display products */}
          <Image />
        </div>  
        <div id="items">
          <header className="App-header">
          <h1>Product Page</h1>
          </header>
          <Product />
        </div>
      </CartContext.Provider>
    </div>
  );
}

export default App;



/* 
https://reactjs.org/docs/context.html#examples

React.createContext(default value) - Create the context object with values set by the state
Context.Provider - Put this around the App Component to share the cart with everything under it
useContext(Context) - get context value (from the Provider, but pass in Context, not Context.Provider)
  - For components which want to use the context (like a <Product />), wrap its return in the <Context.Consumer> 

Updating the context - 
  0. Create context object
  1. Be in the component that the <Context.Provider/> is in. (In our case, App.tsx.)
  2. Create a cart using the useState() hook 
  3. Create the function which updates the cart, which uses setState() created from step 2
  4. Initialize state as an object containing the cart (list) and updating function (func) 
    state = {
      cart: []
    }
  5. Pass that into the Provider:  (Example is for class components so it uses 'this' keyword)
      <CartContext.Provider value={{state, addToCart}}>
        <Content />
      </CartContext.Provider>
  6. In the consumer component do: 
    const { state, addToCart } = useContext(CartContext) 
    Then you can call the addToCart function anytime
*/
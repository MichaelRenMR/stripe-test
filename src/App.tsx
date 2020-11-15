import React from 'react';
import Product from './Prod'; 
import CartContext from './CartContext';
import Cart from './Cart'; 
import './App.css';

const App = () => {
  const [cart, setCart] = React.useState<any>({});

  // key: product.id 
  // value: [object, quantity]
  
  const addToCart = (product:any) => {
    // Check if the product exists in the dictionary 
      // If it does, add 1 to quantity 
      // If it doesn't, add the product with quantity 1 
    console.log(product);
    console.log(product.id);
    let prod_id = product.id; 
    if (prod_id in cart) {
      console.log("Product in cart"); 
      console.log(product); 
      // add 1 to quantity 
      var oldQuantity = cart[prod_id][1]; 
      setCart((prevCart: { product: object; }) => ({...prevCart, prod_id: [...prevCart.prod_id, [product, oldQuantity + 1]}))
    } else {
      console.log("Product not in cart"); 
      console.log(product);
      // initialize with quantity 1
      // The spread/rest operator "..." is being used to collect all of the values of the previous state, then add the new key-value pair,  keep prev state immutable
      setCart((prevCart: any) => ({...prevCart, prod_id: [product, 1]}));
    }
  };

  //cart provider keeps track of state
  return (
    <div className="App">
      <header className="App-header">
       <h1>Product Page</h1>
      </header>
      <CartContext.Provider value={{cart, addToCart}}>
        <div>
          <Product />
          <Cart />
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
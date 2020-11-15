import React, {useState, useEffect} from 'react';
import CartContext from './CartContext';

//const stripe = require('stripe')('sk_test_51HdnXpA8Jg7sAs064LAhHXEbkhJxHpOAg8J7QiCrJW3U8MK8nT1IYDkZXEH3x6imLDv2FHUs3B1MlLlMIZrnVWks00oFrLTtuv');

const SECRET_KEY:string = 'sk_test_51HdnXpA8Jg7sAs064LAhHXEbkhJxHpOAg8J7QiCrJW3U8MK8nT1IYDkZXEH3x6imLDv2FHUs3B1MlLlMIZrnVWks00oFrLTtuv';

export default function Prod() {

  const [prod, setProd] = useState(""); // making it a string instead of the json object itself prevents excessive rerendering 

  const {cart, addToCart} = React.useContext(CartContext);

  const getProduct = async () => {
    const prod = fetch('https://api.stripe.com/v1/products', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + SECRET_KEY
      },
    });
    return (await prod).json();
  }

  useEffect(() => {
    console.log(prod);
    getProduct().then(data => {setProd(JSON.stringify(data));}); 
  }, [prod]);


  const productCard = (product: any) => {
    return (
      <div className="card" style={{width:"40rem", height:"50rem", margin:"2rem"}}>
      <img className="cardImgTop" src={product.images[0]} alt="Umbrella" style={{height:"80%", objectFit:"cover"}}></img>
      <div className="cardBody"> 
        <h3 className="cardTitle">{product.name}</h3>
        <h5 className="cardText">{product.description}</h5>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </div>);
  }

  const listProducts = (products: any) => {
    if (products === "") {
      return ""; 
    } else {
      products = JSON.parse(products); 
    }
    return products.data.map((product: any) => (productCard(product)));
  }


  return (
    <div style={{display:"flex"}}>
      {listProducts(prod)}
    </div>
  );
}




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


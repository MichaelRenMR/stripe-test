import React, {useState, useEffect} from 'react';
import CartContext from './CartContext';
import {Product, Price} from './Types';

//const stripe = require('stripe')('sk_test_51HdnXpA8Jg7sAs064LAhHXEbkhJxHpOAg8J7QiCrJW3U8MK8nT1IYDkZXEH3x6imLDv2FHUs3B1MlLlMIZrnVWks00oFrLTtuv');

const SECRET_KEY:string = 'sk_test_51HdnXpA8Jg7sAs064LAhHXEbkhJxHpOAg8J7QiCrJW3U8MK8nT1IYDkZXEH3x6imLDv2FHUs3B1MlLlMIZrnVWks00oFrLTtuv';

export default function Prod() {

   // making it a string instead of the json object itself prevents excessive rerendering 
  const [prices, setPrices] = useState("");
  const [prods, setProds] = useState(""); 
  const [prodMap, setProdMap] = useState(new Map()); 
  const [html, setHtml] = useState(""); 
 
  
  const {cart, addToCart, removeFromCart} = React.useContext(CartContext);

  const getPrice = async () => {
    const price = fetch('https://api.stripe.com/v1/prices', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + SECRET_KEY
      },
    });
    return (await price).json();
  }

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

  useEffect(() => { // todo: maybe construct a mapping between price_id and product:Product here
    if (prices == "") {
      getPrice().then(data => {setPrices(JSON.stringify(data));}); 
    } 
  }, []);

  useEffect(() => {
    if (prods == "") {
      getProduct().then(data => {setProds(JSON.stringify(data));}); 
    }
  }, []); 

  useEffect(() => {
    if (prices != "" && prods != "") {
      let tempMap = new Map();
      if (prodMap.size === 0) {
        console.log("start");
        let allPrices:Price[] = JSON.parse(prices).data;
        let products:Product[] = JSON.parse(prods).data; 
        for (let i = 0; i < allPrices.length; i++) {
          let singlePrice = allPrices[i];
          let prod_id = singlePrice.product; 
          for (let j = 0; j < products.length; j++) {
            let singleProduct = products[j];
            let id = singleProduct.id;
            if (prod_id == id) {
              tempMap.set(singlePrice.id, singleProduct);
              break; 
            }
          }
        }
        setProdMap(tempMap);
      }
    }
  })


  useEffect(() => {
    console.log("ran");
    setHtml(listPrices(prices, prods)); 
  }, [prodMap]);

  // our own display—frontend will have their own
  const productCard = (price: Price) => {
    let product:Product; // let product = Map(price_id) 
    if (prodMap.has(price.id)) {
      product = prodMap.get(price.id);
      return (
        <div className="card" style={{width:"40rem", height:"50rem", margin:"2rem"}}>
          <img className="cardImgTop" src={product.images[0]} alt="Umbrella" style={{height:"80%", objectFit:"cover"}}></img>
          <div className="cardBody"> 
            <h3 className="cardTitle">{product.name}</h3>
            <h5 className="cardText">{product.description}</h5>
            <button className="btn btn-primary btn-small" onClick={() => addToCart(product)}>Add to cart</button>
            <button className="btn btn-primary btn-small" onClick={() => removeFromCart(product)}>Remove from cart</button>
          </div>
        </div>
      )
    }
  }
  const listPrices = (prices: any, prods: any) => {
    if (prices === "") {
      return ""; 
    } else {
      const parsed_prices = JSON.parse(prices);
      return parsed_prices.data.map((price: Price) => (productCard(price)));
    }
  }
  return (
    <div>
      {html}
    </div>
  )
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


  // const getPrice = async () => {
  //   const price = fetch('https://api.stripe.com/v1/prices', {
  //     method: 'get',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Authorization': 'Bearer ' + SECRET_KEY
  //     },
  //   });
  //   return (await price).json();
  // }

  // useEffect(() => {
  //   console.log(prod);
  //   getProduct().then(data => {setProd(JSON.stringify(data));}); 
  // }, [prod]);



  // const getProductFromPrice = (price:any) => {
  //   let prod_id = price.product; 

  //   let prod = ""; 

  //   const setProd = (new_prod:string) => {
  //     prod = new_prod;
  //     // console.log(prod);
  //   }

  //   const getProduct = async (prod_id:string) => {
  //     const prod = fetch('https://api.stripe.com/v1/products/' + prod_id, {
  //       method: 'get',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         'Authorization': 'Bearer ' + SECRET_KEY
  //       },
  //     });
  //     return (await prod).json();
  //   }
  //   getProduct(prod_id).then(data => {
  //     setProd(JSON.stringify(data));
  //   }); 
  //   return prod; 
  // }

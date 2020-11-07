import React, {useState, useEffect} from 'react';

//const stripe = require('stripe')('sk_test_51HdnXpA8Jg7sAs064LAhHXEbkhJxHpOAg8J7QiCrJW3U8MK8nT1IYDkZXEH3x6imLDv2FHUs3B1MlLlMIZrnVWks00oFrLTtuv');

const SECRET_KEY:string = 'sk_test_51HdnXpA8Jg7sAs064LAhHXEbkhJxHpOAg8J7QiCrJW3U8MK8nT1IYDkZXEH3x6imLDv2FHUs3B1MlLlMIZrnVWks00oFrLTtuv';

export default function Prod() {

  const [prod, setProd] = useState(""); // making it a string instead of the json object itself prevents excessive rerendering 

  const getProduct = async () => {
    console.log("hello");
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
        <a href="afx.dance" className="btn btn-primary">Go somewhere</a>
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




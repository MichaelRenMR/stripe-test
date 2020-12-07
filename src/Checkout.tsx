import React from 'react';
import Product from './Prod';
import CartContext from './CartContext';
import './App.css';
import Image from './Image';
import Stripe from 'stripe';



// const stripe = require('stripe')('sk_test_51HdnXpA8Jg7sAs064LAhHXEbkhJxHpOAg8J7QiCrJW3U8MK8nT1IYDkZXEH3x6imLDv2FHUs3B1MlLlMIZrnVWks00oFrLTtuv');
// ^not working rn. https://stackoverflow.com/questions/56551841/redirect-to-checkout-in-reactjs 
// if (window.Stripe) {
//   const stripe = window.Stripe('sk_test_51HdnXpA8Jg7sAs064LAhHXEbkhJxHpOAg8J7QiCrJW3U8MK8nT1IYDkZXEH3x6imLDv2FHUs3B1MlLlMIZrnVWks00oFrLTtuv'
//     // apiVersion: '2020-08-27',
//     // typescript: true
//   );
// }

//const stripe = await loadStripe('sk_test_51HdnXpA8Jg7sAs064LAhHXEbkhJxHpOAg8J7QiCrJW3U8MK8nT1IYDkZXEH3x6imLDv2FHUs3B1MlLlMIZrnVWks00oFrLTtuv');

const Checkout = (props: any) => {
   //  const [price_amount, quantity, product_name, product_image] = props.value;

    const { cart, addToCart, removeFromCart } = React.useContext(CartContext);

    const checkout = () => {
     
      if (window.Stripe) {
        let line_items:any[] = []; 
        // iterate through the cart, adding {price:price_id, quantity:quantity} objects
        for (let [key, value] of Array.from(cart.entries())) {
          line_items.push({price:key, quantity: value[1]})
        }
        const stripe = window.Stripe('pk_test_51HdnXpA8Jg7sAs06Vtj4qacDVV1bdcVYSuCo31a7dpWIRJ8lG7l9c3hJKtY8tGu66mfXuUOx15nmhRFCeakH3kCI00QhxvM2WV');
        stripe.redirectToCheckout({
          lineItems:line_items, 
          mode: 'payment',
          successUrl: 'https://afx.dance', 
          cancelUrl: 'https://afx.dance',
        })
        .then(function(result) {
          alert(result.error.message); 
        });
      }


      // .then(function(result: { error: { message: any; }; }) {
      //   // If `redirectToCheckout` fails due to a browser or network
      //   // error, display the localized error message to your customer
      //   // using `result.error.message`.
      //  // alert(result.error.message); 

      

    }

    return (
        <div className="checkout">
            <button className="btn btn-primary btn-small" onClick={checkout}>Checkout</button>
        </div>
    );

}

export default Checkout;
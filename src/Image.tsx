import React from 'react';
import Product from './Prod';
import CartContext from './CartContext';
import CartRow from './CartRow'; 
import './App.css';

const Image = () => {
    
    const { cart, addToCart, removeFromCart } = React.useContext(CartContext);
    
    // const imageSource = () => {
    //     // let productString = "";

    //     let images = []; 

    //     for (let [key, value] of Array.from(cart.entries())) {
    //         images.push(<CartRow value={value} />)
    //     }

    //     return images;
    // }

    // const totalPrice = () => {
    //   let price: number = 0; 
    //   for (let [key, value] of Array.from(cart.entries())) {
    //     price += 
    //   }
    //   return price; 
    // }

    let images = []; 

    let total_price = 0; 

    for (let [key, value] of Array.from(cart.entries())) {
        images.push(<CartRow value={value} />)
        total_price += value[0];         
    }

    total_price /= 100; 

    return (
        <div>
            <div className="cart-info">
                {images}
                <div className="total-price">
                    <h3>Total Price: {total_price.toFixed(2)}</h3>
                </div>
            </div>
            
        </div>
    );
}

export default Image;


//  <img className="cardImgTop" src={value[0].images[0]} alt="Umbrella" style={{height:"80%", objectFit:"cover"}}></img>
import React from 'react' 



export interface CartInterface {
  cart: Array<any>;
  addToCart: (product: string, price: number) => void;
}

export const CartContext = React.createContext<CartInterface>({
  cart: [],
  addToCart: () => {}
});




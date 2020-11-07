import React from 'react';
import Product from './Prod'; 
import './App.css';

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
       <h1>Product Page</h1>
      </header>
      <div className="Products">
        <Product/>
      </div>
      
    </div>
  );
}

export default App;

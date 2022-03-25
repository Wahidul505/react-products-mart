import React from 'react';
import './Product.css';

const Product = ({product, addToCart}) => {
    const {name,price,brand} = product;
    return (
        <div className='product-card'>
            <h3>{name}</h3>
            <div className="info">
                <p>Price: ${price}</p>
                <p><small>Brand:{brand}</small></p>
            </div>
            <button onClick={()=>addToCart(product)} className='add-btn'>Add to Cart</button>
        </div>
    );
};

export default Product;
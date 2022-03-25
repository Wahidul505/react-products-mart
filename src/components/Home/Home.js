import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import './Home.css';
import { addToDb, getFromDb, removeFromDb } from '../../utilities/localStorageDb';
// all the functionalities in Home(parent component)
const Home = () => {
    // declaring state for all product to show in ui and all added items to show in cart , both contained in an array 
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    // fetching and getting all product from json file and storing them in the products variable 
    useEffect(()=>{
        fetch('productsData.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    // event handler for product to add in cart 
    const addToCart = (product) =>{
        let newCart;
        const exist = cart.find(element => element.id === product.id);
        // checking if the product is exist in the cart for increasing the product quantity by 1 
        if(!exist){
            product.quantity = 1;
            newCart = [...cart,product];
        }
        // else declaring a property called "quantity" in the product object 
        else{
            const rest = cart.filter(element => element.id !== product.id);
            product.quantity = product.quantity + 1;
            newCart = [...rest, product];
        }
        // again storing the selected product into cart variable 
        setCart(newCart);
        // at the same time storing the selected item with quantity in the local storage 
        addToDb(product.id)
    }
    // event handler for clearing all cart from cart component 
    const clearCart = () =>{
        const emptyCart = [];
        setCart(emptyCart);
        removeFromDb();
    }
    // using useEffect() for getting the id and quantity from localStorage
    useEffect(()=>{
        const storedProducts = getFromDb();
        const storedCart = [];
        // as the localStorage item is an object , using for in loop for that 
        for(const id in storedProducts){
            // finding each product if they are in the products variable, if true then sets the quantity from localStorage in their original object for each product 
            const addedProduct = products.find(product => product.id === id);
            // checking if the products data gets fully load by checking the array length
            if(products.length > 0){
                // sets the quantity of the product item from local storage then pushing it in a new array 
                const quantity = storedProducts[id];
                addedProduct.quantity = quantity;
                storedCart.push(addedProduct);
            }
        }
        // sets the new array in the cart array by using state function 
        setCart(storedCart);
    },[products])
    return (
        <div>
            <div className="shop-container">
                <div className="products-container">
                {
                    products.map(product => <Product key={product.id} product={product}
                    addToCart={addToCart}
                    ></Product>)
                }
                </div>
                <div className="cart-container">
                    <Cart cart={cart} clearCart={clearCart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Home;
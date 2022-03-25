const getFromDb = () =>{
    let cart = {};
    const storedCart = localStorage.getItem('cart');
    if(storedCart){
        cart = JSON.parse(storedCart); 
    }
    return cart;
}
const addToDb = (id) =>{
    const cart = getFromDb();
    const quantity = cart[id];
    if(!quantity){
        cart[id] = 1;
    }
    else{
        cart[id] = quantity + 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}
const removeFromDb = () =>{
    localStorage.removeItem('cart');
}
export {addToDb, getFromDb, removeFromDb}
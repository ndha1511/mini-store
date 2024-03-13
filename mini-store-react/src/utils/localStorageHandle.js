

export const getItemToLocalStorage = (name) => {
    const item = localStorage.getItem(name);
    if (item) {
        return JSON.parse(item);
    }
    return false;
}

export const updateCart = (item) => {
    const cart = getItemToLocalStorage("cart");
    if (!cart || !item) return; 

    const index = cart.findIndex(cartItem => (
        cartItem.productId === item.productId &&
        cartItem.color === item.color &&
        cartItem.size === item.size
    ));
    
    if (index !== -1) {
        cart[index] = item;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

export const deleteCart = (index) => {
    const cart = getItemToLocalStorage("cart");
    if (cart && index >= 0 && index < cart.length) { 
        cart.splice(index, 1); 
        localStorage.setItem("cart", JSON.stringify(cart)); 
    }
    return cart;
   

}
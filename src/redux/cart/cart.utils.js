// two params, existing cart items and cart Item to add
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );  //if not found return null
    if(existingCartItem){
        //.map will return a new array
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
            )
    }
    //quantity property gets attached the first time around since this if block won't run when it's a new item!
    return [...cartItems, { ...cartItemToAdd, quantity: 1}]
}
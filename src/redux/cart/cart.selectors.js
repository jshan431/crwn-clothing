import { createSelector } from 'reselect';

const selectCart = state => state.cart;

// two arguments for this function
// now a memoizaized selector
export const selectCartItems = createSelector(
    //array of input selecters
    [selectCart],
    cart => cart.cartItems      //function we want returned from this selector
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumalatedQuantity, cartItem) => 
                accumalatedQuantity + cartItem.quantity, 0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce(
            (accumalatedQuantity, cartItem) => 
                accumalatedQuantity + cartItem.quantity * cartItem.price, 0
    )
)

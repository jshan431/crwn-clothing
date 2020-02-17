import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';      //for memoization
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions'

//By not connecting mapDispatchToProps we get it as a prop automatically...?
const CartDropdown= ({ cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.length ? (
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}/>
            ))
            ) : (
                <span className='empty-message'>Your cart is empty</span>
            )}
        </div> 
        {/* using the withRouter we get access to history. Here go to the checkout page */}
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());     //dispatch action shorthand
        }}>GO TO CHECKOUT</CustomButton>
    </div>
);

/*
const mapStateToProps = ({ cart : { cartItems }}) => ({
    //cartItem : cartItems
    cartItems
});
*/
// save on performance using memoization compared to the code above
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});


export default withRouter(connect(mapStateToProps)(CartDropdown));
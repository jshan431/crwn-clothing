import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import { auth } from '../../firebase/firebase.utils'; 
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink} from './header.styles';

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionDiv className='option' onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
                :
                <OptionLink className='option' to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
        
    </HeaderContainer>
)

/*
//demonstration of advance destructuring
const mapStateToProps = ({user : { currentUser}, cart: { hidden }}) => ({
    //assign header's currentUser from root reducer dot user reducer dot current user
    //currentUser: state.user.currentUser     <--- previous
    currentUser,
    hidden
});
*/
const mapStateToProps = createStructuredSelector({
   currentUser : selectCurrentUser,
   hidden: selectCartHidden
});


export default connect(mapStateToProps)(Header);
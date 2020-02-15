import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import { auth } from '../../firebase/firebase.utils'; 
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown />
        }
        
    </div>
)

//demonstration of advance destructuring
const mapStateToProps = ({user : { currentUser}, cart: { hidden }}) => ({
    //assign header's currentUser from root reducer dot user reducer dot current user
    //currentUser: state.user.currentUser     <--- previous
    currentUser,
    hidden
});

export default connect(mapStateToProps)(Header);
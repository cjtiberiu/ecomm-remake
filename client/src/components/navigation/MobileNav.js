import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './MobileNav.css';

// logout imports
import firebase from 'firebase'
import { toast } from 'react-toastify';

const MobileNav = props => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [displayMenu, setDisplayMenu] = useState(false);
    

    const handleNavMenu = () => {
        displayMenu ? setDisplayMenu(false) : setDisplayMenu(true);
    }

    const logout = () => {
        firebase.auth().signOut();

        dispatch({ type: "USER_LOGOUT", payload: null });

        dispatch({ type: "CLEAR_CART" });

        toast.dark('You have been signed out')

        history.push('/login');
    }

    return (
        <div className='mobile-nav'>
            <div className={`menu-btn ${displayMenu ? 'open' : ''}`} onClick={handleNavMenu}>
                <div className="menu-btn__burger"></div>
            </div>

            {
                //!displayMenu ? null : (
                    <div className={`mobile-menu ${displayMenu ? 'open' : ''}`}>
                        <Link to='/'><div id='cart-link' className='mobile-nav-link' onClick={() => setDisplayMenu(false)}>Home</div></Link>
                        <Link to='/products'><div id='products-link' className='mobile-nav-link' onClick={() => setDisplayMenu(false)}>Shop</div></Link>
                        <Link to='/cart'><div id='cart-link' className='mobile-nav-link' onClick={() => setDisplayMenu(false)}>Cart</div></Link>
                        <Link to='/wishlist'><div id='cart-link' className='mobile-nav-link' onClick={() => setDisplayMenu(false)}>Wishlist</div></Link>
                        {
                            !user ? (
                                <>
                                    <Link to='/register'><div id='cart-link' className='mobile-nav-link' onClick={() => setDisplayMenu(false)}>Register</div></Link>
                                    <Link to='/login'><div id='cart-link' className='mobile-nav-link' onClick={() => setDisplayMenu(false)}>Login</div></Link>
                                </>
                            ) : ''
                        }
                        
                        {
                            user ? (
                                user.role === 'admin' ? (
                                    <Link to='/admin/dashboard'><div id='cart-link' className='mobile-nav-link' onClick={() => setDisplayMenu(false)}>Dashboard</div></Link>
                                ) : user.role === 'client' ? (
                                    <Link to='/user/dashboard'><div id='cart-link' className='mobile-nav-link' onClick={() => setDisplayMenu(false)}>Dashboard</div></Link>
                                ) : ''
                            ) : ''
                            
                        }

                        {
                            user ? (
                                <div 
                                    id='cart-link' 
                                    className='mobile-nav-link' 
                                    onClick={() => {
                                        logout();
                                        setDisplayMenu(false)
                                    }}
                                >
                                    Logout
                                </div>
                            ) : ''
                        }
                    </div>
                //)
            }
        </div>
    )
};

export default MobileNav;
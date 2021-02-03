import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './MobileNav.css';

const MobileNav = props => {

    const [displayMenu, setDisplayMenu] = useState(false);

    const handleNavMenu = () => {
        displayMenu ? setDisplayMenu(false) : setDisplayMenu(true);
    }

    return (
        <div className='mobile-nav'>
            <div className={`menu-btn ${displayMenu ? 'open' : ''}`} onClick={handleNavMenu}>
                <div className="menu-btn__burger"></div>
            </div>

            {
                !displayMenu ? null : (
                    <div className='mobile-menu'>
                        <Link to='/products'><div id='products-link' className='mobile-nav-link' onClick={() => setDisplayMenu(false)}>Shop</div></Link>
                        <Link to='/cart'><div id='cart-link' className='mobile-nav-link' onClick={() => setDisplayMenu(false)}>Cart</div></Link>
                    </div>
                )
            }
        </div>
    )
};

export default MobileNav;
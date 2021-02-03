import React from 'react';
import { Link } from 'react-router-dom';

const userNav = () => {


    return (
        <nav>
            <ul className='nav flex-column'>
                <li className='nav-item'>
                    <Link to='/user/dashboard' className='nav-link border border-bottom-5'>Dashboard</Link> 
                </li>

                <li className='nav-item'>
                    <Link to='/user/changepassword' className='nav-link border border-bottom-5'>Change password</Link> 
                </li>

                <li className='nav-item'>
                    <Link to='/user/wishlist' className='nav-link border border-bottom-5'>Wishlist</Link> 
                </li>

                <li className='nav-item'>
                    <Link to='/user/orders' className='nav-link border border-bottom-5'>Orders</Link> 
                </li>
            </ul>
        </nav>
    )
}

export default userNav;
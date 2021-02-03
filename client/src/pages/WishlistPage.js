import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getWishlist } from '../utility/dbWishlist';
import ProductCard from '../components/cards/ProductCard';

const WishlistPage = props => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        if (user) {
            getWishlist(user.token)
                .then(res => setWishlist(res.data))
                .catch(err => console.log(err))
        }
        
    }, [])

    return (
        <div className='mt-3'>
            <h2>Wishlist</h2>
            {
                !user ? (
                    <div>You have to <Link to='/register'>register</Link> or <Link to='/login'>login</Link> to add to wishlist</div>
                ) : (
                    <div className='d-flex'>
                        {
                            wishlist.length === 0 ? 'No products to show' : wishlist.map(el => {
                                return <ProductCard product={el} type='user' />
                            })
                        }
                    </div>
                )
            }
        </div>
    )
};

export default WishlistPage;
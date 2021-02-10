import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWishlist } from '../utility/dbWishlist';
import ProdCard from '../components/cards/ProdCard';
import CartDrawer from '../components/navigation/CartDrawer';

const WishlistPage = props => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [wishlist, setWishlist] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (user) {
            getWishlist(user.token)
                .then(res => {
                    setWishlist(res.data);
                    dispatch({ type: 'SET_WISHLIST', payload: res.data.map(el => el._id)});
                })
                .catch(err => console.log(err))
        }
        
    }, [user, dispatch, refresh])

    return (
        <div className='mt-lg-3 mt-5'>
            <div className='d-flex justify-content-lg-start justify-content-center'>
                <h2 className='mt-lg-0 mt-3'>Wishlist</h2>
            </div>

            <CartDrawer />
            
            {
                !user ? (
                    <div>You have to <Link to='/register'>register</Link> or <Link to='/login'>login</Link> to add to wishlist</div>
                ) : (
                    <div className='d-flex flex-wrap'>
                        {
                            wishlist.length === 0 ? 'No products to show' : wishlist.map(el => {
                                return <ProdCard key={el._id} product={el} type='wish' setWishlist={setWishlist} />
                            })
                        }
                    </div>
                )
            }

            
        </div>
    )
};

export default WishlistPage;
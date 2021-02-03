import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons';
import { formatPrice } from '../../utility/formatPrice';
import { updateUserCart, getCartItems } from '../../utility/dbCart';
import { addToWishlist } from '../../utility/dbWishlist';
import { toast } from 'react-toastify';

import RatingModal from '../modal/RatingModal';

const ProductDetails = props => {

    const { product, setRatingModal } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const updateCart = (product) => {

        // update cart
        updateUserCart(user.token, product, 'plus')
            .then(res => {
                if (res.data.message !== 'ok') {
                    alert(res.data.message);
                }

                // get the new cart items count
                getCartItems(user.token)
                    .then(res => {
                        dispatch({ type: 'GET_CART_ITEMS', payload: res.data })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    };

    const updateWishlist = () => {
        
        // add to wishlsit
        addToWishlist(user.token, product)
            .then(res => {
                if (res.data.message === 'ok') {
                    toast.success('Product addded to wishlist');
                } else {
                    toast(res.data.message);
                }
                
            })
            .catch(err => console.log(err));
    }

    return (
        <Card
            style={{ width: '100%' }}
            actions={[
                <div className='d-flex flex-column' onClick={() => !user ? history.push('/login') : updateCart(product)}>  
                    Add to cart
                    <ShoppingCartOutlined key="cart" />
                </div>,
                <div className='d-flex flex-column' onClick={() => !user ? history.push('/login') : updateWishlist()}>  
                    Add to wishlist
                    <HeartOutlined key="wishlist" />
                </div>,
                <div className='d-flex flex-column' onClick={() => !user ? history.push('/login') : setRatingModal(true)}>
                    {!user ? 'Login to Leave Reting' : 'Rating'}
                    <StarOutlined key="Rating" />
                </div>,
            ]}
        >
            <div className='mt-2 d-flex justify-content-between'><strong>Price:</strong> ${formatPrice(product.price)}</div>
            <div className='mt-2 d-flex justify-content-between'><strong>Stock:</strong> {product.quantity}</div>
            <div className='mt-2 d-flex justify-content-between'><strong>Category:</strong> {!product.category ? null : product.category.name}</div>
            <div className='mt-2 d-flex justify-content-between'><strong>Sub Categories:</strong> {!product.subs ? null : product.subs.map(el => el.name)}</div>
            <div className='mt-2 d-flex justify-content-between'><strong>Color:</strong> {product.color}</div>
            <div className='mt-2 d-flex justify-content-between'><strong>Brand:</strong> {product.brand}</div>
            <div className='mt-2 d-flex justify-content-between'><strong>Shipping:</strong> {product.shipping}</div>
        </Card>
    )
};

export default ProductDetails;
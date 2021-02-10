import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import ProductRating from '../product/ProductRating';
import { updateUserCart, getCartItems } from '../../utility/dbCart';
import { addToWishlist, removeFromWishlist, getWishlist } from '../../utility/dbWishlist';
import { formatPrice, limitTitle } from '../../utility/formatPrice';
import { toast } from 'react-toastify';

import './ProdCard.css';

//const { Meta } = Card;

const ProdCard = props => {

    const { product, type, setWishlist } = props;
    const products = useSelector(state => state.products);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);


    // update the cart and set the new cart items count when card button is clicked
    const updateCart = (product) => {

        // update cart
        updateUserCart(user.token, product, 'plus')
            .then(res => {
                if (res.data.message !== 'ok') {
                    alert(res.data.message);
                }

                // open the cart drawer component using redux state
                dispatch({ type: 'OPEN_DRAWER' })

                // get the new cart items count
                getCartItems(user.token)
                    .then(res => {
                        dispatch({ type: 'GET_CART_ITEMS', payload: res.data })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const updateWishlist = () => {
        
        // add to wishlsit
        addToWishlist(user.token, product)
            .then(res => {
                if (res.data.message === 'ok') {
                    dispatch({
                        type: 'SET_WISHLIST',
                        payload: res.data.wishlist
                    });
                    //toast.success('Product addded to wishlist');
                } else {
                    toast(res.data.message);
                }
                
            })
            .catch(err => console.log(err));
    }

    const removeItemFromWishlist = (token, id) => {
        // remove from wishlist
        removeFromWishlist(token, id)
            .then(response => {
                dispatch({
                    type: 'SET_WISHLIST',
                    payload: response.data.wishlist
                });
                getWishlist(user.token)
                    .then(res => type === 'wish' ? setWishlist(res.data) : null)
                    .catch(err => console.log(err))
            })
            .catch(err => toast.error(err))
    }

    const getIndex = () => {
        return products.wishlist.indexOf(product._id);
    }

    const renderHeartIcon = () => {
        const index = getIndex()
        return index !== -1
            ? <HeartFilled className='text-danger' key="wishlist" />
            : <HeartOutlined key='wishlist' />
    }

    const controlWishlist = () => {
        const index = getIndex();
        return index === -1
            ? updateWishlist()
            : removeItemFromWishlist(user.token, product._id)
        
    }

    return (
        <Card key={product._id}
            className='product-card'
            style={{ width: 250, marginRight: 10, marginBottom: 10 }}
            cover={
                <div 
                    onClick={() => {
                        dispatch({ type: 'SET_CURRENT', payload: 'products'})
                        history.push(`/products/${product._id}`)
                    }}
                    style={{ height: '180px', cursor: 'pointer', backgroundSize: '80%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${product.images.length === 0 ? 'https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png' : product.images[0].url})` }}>
                    {/* <img src={product.images[0].url} /> */}
                </div>
                
            }
            actions={
                type === 'admin' ? [
                    <EditOutlined key="edit" onClick={() => history.push(`/admin/product/edit/${product._id}`)} />,
                    <DeleteOutlined key="delete" onClick={() => history.push(`/admin/product/delete/${product._id}`)} />,
                ] : !user ? [
                    <div onClick={() => history.push('/login')}>Log in to use functionality</div>
                ] : [
                    <div 
                        className='d-flex justify-content-center' 
                        onClick={() => {
                            if (!user) {
                                history.push('/login');
                            } else {
                                controlWishlist();
                            }

                            
                        }}
                    >  
                        { renderHeartIcon() }
                        
                    </div>,
                    <div className='d-flex justify-content-around align-items-center' onClick={() => product.quantity > 0 ? !user ? history.push('/login') : updateCart(product) : null}>
                        {product.quantity > 0 ? !user ? 'Login' : '' : 'Out of stock'}
                        <ShoppingCartOutlined key="Add to cart" />
                    </div>,
                ]}
        >
            {/* <Meta
                title={product.title}
                description={product.description}
            /> */}
            <div className='d-flex justify-content-between'>
                <span className='font-weight-bold'>{limitTitle(product.title)}</span>
                <Tag className='text-center h-auto' color='blue'>$ {formatPrice(product.price)}</Tag>
            </div>
            <div className='mt-2 d-flex justify-content-start'>
                {product.description}
            </div>
            <div className='w-100 d-flex justify-content-start align-items-start mt-3'>
                <ProductRating product={product} />
            </div>
            
        </Card>
    )
};

export default ProdCard;
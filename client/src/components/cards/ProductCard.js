import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Skeleton } from 'antd';
import { EditOutlined, DeleteOutlined, ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import StarRatings from 'react-star-ratings';
import ProductRating from '../product/ProductRating';
import { updateUserCart, getCartItems } from '../../utility/dbCart';
import { removeFromWishlist, getWishlist } from '../../utility/dbWishlist';
import { formatPrice } from '../../utility/formatPrice';
import { toast } from 'react-toastify';

const { Meta } = Card;

const ProductCard = props => {

    const { product, type, setWishlist } = props;
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

    return (
        <Card key={product._id}
            className='product-card'
            style={{ width: 250, marginRight: 5, marginBottom: 5 }}
            cover={
                <div style={{ height: '180px', backgroundSize: '80%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${product.images.length === 0 ? 'https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png' : product.images[0].url})` }}>
                    {/* <img src={product.images[0].url} /> */}
                </div>
                
            }
            actions={
                type === 'admin' ? [
                    <EditOutlined key="edit" onClick={() => history.push(`/admin/product/edit/${product._id}`)} />,
                    <DeleteOutlined key="delete" onClick={() => history.push(`/admin/product/delete/${product._id}`)} />,
                ] : type === 'user'  ? [
                    <div 
                        className='d-flex justify-content-around align-items-center' 
                        onClick={() => {
                            dispatch({ type: 'SET_CURRENT', payload: 'products'})
                            history.push(`/products/${product._id}`)
                        }}
                    >
                        View Product
                        <EyeOutlined key="View product" />
                    </div>,
                    <div className='d-flex justify-content-around align-items-center' onClick={() => product.quantity > 0 ? !user ? history.push('/login') : updateCart(product) : null}>
                        {product.quantity > 0 ? !user ? 'Login' : 'Add to cart' : 'Out of stock'}
                        <ShoppingCartOutlined key="Add to cart" onClick={() => history.push(`/admin/product/delete/${product._id}`)} />
                    </div>,
                ] : [
                    <div 
                        className='d-flex justify-content-around align-items-center' 
                        onClick={() => {
                            dispatch({ type: 'SET_CURRENT', payload: 'products'})
                            history.push(`/products/${product._id}`)
                        }}
                    >
                        View Product
                        <EyeOutlined key="View product" />
                    </div>,
                    <div className='d-flex justify-content-around align-items-center' onClick={() => product.quantity > 0 ? !user ? history.push('/login') : updateCart(product) : null}>
                        {product.quantity > 0 ? !user ? 'Login' : 'Add to cart' : 'Out of stock'}
                        <ShoppingCartOutlined key="Add to cart" onClick={() => history.push(`/admin/product/delete/${product._id}`)} />
                    </div>,
                    <div 
                        className='d-flex justify-content-around align-items-center' 
                        onClick={() => {
                            removeFromWishlist(user.token, product._id)
                                .then(r1 => {
                                    console.log(r1);
                                    getWishlist(user.token)
                                        .then(res => setWishlist(res.data))
                                        .catch(err => console.log(err))
                                })
                                .catch(err => toast.error(err))
                    }}>
                        Remove from wishlist
                    <ShoppingCartOutlined key="Add to cart" />
                </div>,
                ] }
        >
            <Meta
                title={`${product.title} - $${formatPrice(product.price)}`}
                description={product.description}
            />
            <div className='w-100 d-flex justify-content-start align-items-center mt-3'>
                <ProductRating product={product} />
            </div>
            
        </Card>
    )
};

export default ProductCard;
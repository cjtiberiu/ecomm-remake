import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems, updateUserCart } from '../utility/dbCart';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Divider, Button } from 'antd';
import { formatPrice } from '../utility/formatPrice';
import CartProduct from '../components/product/CartProduct';



const CartPage = props => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const cart = useSelector(state => state.cart); 

    // get cart items from db and set to redux state
    useEffect(() => {
        if (user) {
            getCartItems(user.token)
                .then(res => dispatch({ type: 'GET_CART_ITEMS', payload: res.data }))
                .catch(err => console.log(err))
        }
    }, [user, refresh])

    // set the total cart amount every time cart items array changes
    useEffect(() => {

        const price = cart.items.reduce((a, b) => {
            return a + (b.price * b.qty)
        }, 0)

        setTotalPrice(price)

    }, [cart.items])

    // update the cart when user modifies cart product quantity
    const updateCart = (product, type) => {
        updateUserCart(user.token, product, type)
            .then((res) => {
                if (res.data.message !== 'ok') {
                    alert(res.data.message);
                }
                setRefresh(!refresh)
            })
            .catch(err => console.log(err))
    }

    const styles = {
        title: {
            textAlign: 'center',
            
        },
        normal: {
            width: '20%',
            maxWidth: '20%',
            textAlign: 'center'
        }
        
    }

    
    return (
        <div>
            <div className='row'>
                <div className='col-md-10 mt-3'>
                    <h3>Cart Page - {cart.itemsCount} items </h3>
                </div>
            </div>
            
            <div className='row'>
                <div className='col-md-8 d-flex flex-column align-items-center justify-content-center'>
                    {
                        cart.items.map(el => {
                            return <CartProduct type='cart' key={el._id} product={el} updateCart={updateCart} />
                        })
                    }

                    

                    <div className='w-100 d-flex align-items-center'>
                        <div style={{ width: '10%', height: '100%'}}></div>
                        <div style={styles.title}></div>
                        <div style={styles.normal}></div>
                        <div style={styles.normal}></div>
                        <div style={styles.normal}></div>
                        {/* <div style={styles.normal}><h5>Total: ${formatPrice(totalPrice)}</h5> </div> */}
                    </div>
                </div>

                <div className='col-md-4 d-flex flex-column align-items-center'>
                    <h5>Order summary</h5>
                    {
                        cart.items.map(el => {
                            return (
                                <div key={el._id}>{el.title} x {el.qty}</div>
                            )
                        })
                    }
                    <Divider />
                    <h5>Total: ${formatPrice(totalPrice)}</h5>
                    <Button className='mt-2' disabled={cart.items.length === 0} onClick={() => props.history.push('/checkout')} type='primary'>Proceed to checkout</Button>
                </div>
            </div>

            {/* <div className='row mt-3'>
                <div className='col-md-4'>
                    <Button onClick={() => props.history.push('/checkout')} type='primary'>Proceed to checkout</Button>
                </div>
            </div> */}
            

            

        </div>
    )
};

export default CartPage;
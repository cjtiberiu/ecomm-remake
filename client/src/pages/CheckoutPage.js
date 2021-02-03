import React from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../components/product/CartProduct';
import { Button } from 'antd';
import { addOrder } from '../utility/dbOrder';
import DeliveryAddress from '../components/forms/DeliveryAddress';

const CheckoutPage = props => {

    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    const styles = {
        title: {
            textAlign: 'center',
            
        },
        normal: {
            width: '20%',
            maxWidth: '20%',
            display: 'flex',
            justifyContent: 'center',        }
    }

    return (
        <div className='mt-3'>

            <div className='row'>
                <div className='col-md-10 mt-3'>
                    <h3>Order summary </h3>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-10 mt-3'>
                    <DeliveryAddress />
                </div>
            </div>

            <div className='row'>
                <div className='col-md-10 mt-3 d-flex flex-column'>
                    {
                        cart.items.map(el => {
                            return <CartProduct key={el._id} type='checkout' product={el} />
                        })
                    }
                </div>
            </div>

            <div className='row'>
                <div className='col-md-10 w-100 d-flex align-items-center' style={{ height: '100px'}}>
                        <div style={{ width: '10%', height: '100%'}}></div>
                        <div style={styles.title, styles.normal}></div>
                        <div style={styles.normal}></div>
                        <div style={styles.normal}></div>
                        <div style={styles.normal}>
                            <Button 
                                type='primary' 
                                onClick={() => {
                                    addOrder(user.token, cart.items)
                                        .then(res => alert('succes'))
                                        .catch(err => console.log(err))
                                }}
                            >Pay</Button>
                        </div>
                        
                    </div>
                
            </div>


            
        </div>
    )
};

export default CheckoutPage;
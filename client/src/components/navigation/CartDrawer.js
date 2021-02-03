import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CartDrawer = props => {
    
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const history = useHistory();

    const onClose = () => {
        dispatch({ type: 'CLOSE_DRAWER' });
    }

    return (
        <Drawer
          title="Cart"
          placement={'right'}
          closable={false}
          onClose={onClose}
          visible={cart.visibleDrawer}
          key={'right'}
        >
            <div className='d-flex flex-column align-items-center'>
            {
                cart.items.map(el => {
                    return <div key={el._id}>{el.title} x {el.qty}</div>
                })      
            }
            <Button 
                className='mt-5' 
                type='primary' 
                onClick={() => {
                    onClose();
                    history.push('/cart')
                }}
            >Go to cart</Button>
            </div>
        

            
        </Drawer>
    )
};

export default CartDrawer;


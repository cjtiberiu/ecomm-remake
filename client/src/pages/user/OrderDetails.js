import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrder } from '../../utility/dbOrder';

const styles = {
    orderInfo: {
        borderBottom: '1px solid black',
    }
}

const OrderDetails = props => {

    const [orderDetails, setOrderDetails] = useState({
        user: {
            email: '',
            address: '',
        },
        createdAt: '',
        amount: 0,
        items: []
    });
    const user = useSelector(state => state.user);

    // get the order details using params 
    useEffect(() => {
        if (user) {
            getOrder(user.token, props.match.params.orderid)
                .then(res => {
                    setOrderDetails(res.data)
                })
                .catch(err => console.log(err))
        }
        
    }, [user, props.match.params.orderid])

    return (
        <div className='col-md-10'>
            <h4 style={{fontStyle: 'italic'}}>Order: {orderDetails._id}</h4>
            <div style={styles.orderInfo}><span style={{ fontWeight: 'bold'}}>Email:</span> {orderDetails.user.email}</div>
            <div style={styles.orderInfo}><span style={{ fontWeight: 'bold'}}>Address:</span> {orderDetails.user.address}</div>
            <div style={styles.orderInfo}><span style={{ fontWeight: 'bold'}}>Date:</span> {Date(orderDetails.createdAt)}</div>
            <div><span style={{ fontWeight: 'bold'}}>Products: </span></div>
            <div className='row'>
                <div className='col-md-10 d-flex flex-column'>
                {
                    orderDetails.items.map(el => {
                        return (
                            <div key={el._id} className='d-flex justify-content-between'>
                                <div className='w-25'>{el.title}</div>
                                <div>Quantity: {el.qty}</div>
                                <div>Price: ${el.price}</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <div style={{...styles.orderInfo, borderTop: '1px solid black', fontSize: '1.20rem'}}><span style={{ fontWeight: 'bold'}}>Amount:</span> ${orderDetails.amount}</div>
            
            
            
        </div>
    )
};

export default OrderDetails;
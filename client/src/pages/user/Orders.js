import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserOrders } from '../../utility/dbOrder';
import { formatPrice } from '../../utility/formatPrice';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.user);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            getUserOrders(user.token)
                .then(res => setOrders(res.data))
                .catch(err => console.log(err))
        }
    }, [user])

    return (

        <div className='col-md-10'>
            <div className='row'>
                <div className='col-md-10'>
                    <h5>Manage Orders</h5>
                </div>
            </div>

            <div className='row'>

                <div className='col-md-10 d-flex flex-column'>

                    {
                        orders.map(el => {
                            return (
                                <div className='border bg-light pl-1 mb-1 d-flex justify-content-between align-items-center' key={el._id}>
                                    <div>Ordered by: {el.user.name}</div>
                                    <div>Amount: ${formatPrice(el.amount)}</div>
                                    <div className='d-flex align-items-center'>
                                        <button 
                                            className='btn btn-danger'
                                            onClick={() => history.push(`/user/orders/${el._id}`)}
                                            type="light" 
                                            shape="round" 
                                            size='small'
                                        >Details</button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        
        </div>
        
    )
};

export default Orders;
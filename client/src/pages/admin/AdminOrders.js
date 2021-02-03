import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAdminOrders } from '../../utility/dbOrder';
import { formatPrice } from '../../utility/formatPrice';

const AdminOrders = () => {

    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.user);
    const history = useHistory();

    // get all the orders from api endpoint
    useEffect(() => {
        if (user) {
            getAdminOrders(user.token)
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
                                    <div style={{ width: '25%', maxWidth: '25%', cursor: 'pointer'}} onClick={() => history.push(`/admin/orders/${el._id}`) }>Ordered by: {el.user.name}</div>
                                    <div>Amount: ${formatPrice(el.amount)}</div>
                                    <div className='d-flex align-items-center'>
                                        <button 
                                            className='btn btn-green'
                                            onClick={() => history.push(`/admin/orders/${el._id}`)}
                                            type="light" 
                                            shape="round" 
                                            size='small'
                                        >Details</button>
                                        <button 
                                            className='btn btn-danger'
                                            onClick={() => console.log('delete')}
                                            type="light" 
                                            shape="round" 
                                            size='small'
                                        >Delete</button>
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

export default AdminOrders;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import { updateUserAddress, getUserAddress } from '../../utility/dbUser';
import { toast } from 'react-toastify';

const DeliveryAddress = props => {

    const { address, setAddress, newAddress, setNewAddress } = props;

    const user = useSelector(state => state.user);

    // UTILITY FUNCITON
    // get the current user address from api endpoint
    useEffect(() => {
        if (user) {
            getUserAddress(user.token)
                .then(res => {
                    setAddress(res.data)
                    setNewAddress(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [user])

    // UTILITY FUNCTION
    // update the user address in db when button is clicked
    // and set the new address in the frontend
    const changeAddress = (e) => {
        updateUserAddress(user.token, newAddress)
            .then(() => {
                toast.success('Address updated');
                getUserAddress(user.token)
                    .then(res => {
                        setAddress(res.data)
                        setNewAddress(res.data)
                    })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex flex-column'>
            <h5>Delivery address - current: {address} </h5>
            <div className='row'>
                <div className='col-md-8 d-flex justify-content-between'>
                    <Input style={{ width: '80%' }} value={newAddress} onChange={e => setNewAddress(e.target.value)} />
                    <Button type='secondary' onClick={changeAddress}>Change address</Button>
                </div>
            </div>
        </div>
    )
};

export default DeliveryAddress;
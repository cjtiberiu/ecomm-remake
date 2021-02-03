import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProduct, removeProduct } from '../../../utility/dbProduct';

const DeleteProduct = props => {

    const { match, history } = props;
    const [product, setProduct] = useState({});
    const user = useSelector(state => state.user);

    useEffect(() => {
        getProduct(match.params.id)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (e) => {
        e.preventDefault();

        if (user) {
            removeProduct(user.token, match.params.id)
                .then(() => {
                    toast.success('Product deleted')
                    history.push('/admin/products')
                })
                .catch(err => toast.error(err.response.data.message))
        }
    }

    return (
        <div className='col-md-10'>
            <div className='row'>
                <h3>Are you sure you want to delete {product.title}?</h3>
            </div>
            <div className='row'>
                <button onClick={handleDelete} className='btn btn-danger mt-1' type='primary'>Yes</button>
                <button onClick={() => history.push('/admin/products')} className='btn btn-dark mt-1' type='primary'>No</button>
            </div>
        </div>
    )
};

export default DeleteProduct;
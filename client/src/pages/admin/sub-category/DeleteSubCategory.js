import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getSubCategory, removeSubCategory } from '../../../utility/dbSub';

const DeleteSubCategory = props => {

    const { match, history } = props;
    const [name, setName] = useState('');
    const user = useSelector(state => state.user);

    useEffect(() => {
        getSubCategory(match.params.slug)
            .then(res => setName(res.data.category.name))
            .catch(err => console.log(err));
    }, [match.params.slug])

    const handleDelete = (e) => {
        e.preventDefault();

        if (user) {
            removeSubCategory(user.token, match.params.slug)
                .then(() => {
                    toast.success('Sub-Category deleted')
                    history.push('/admin/subs')
                })
                .catch(err => toast.error(err.response.data.message))
        }
    }

    return (
        <div className='col-md-10'>
            <div className='row'>
                <h3>Are you sure you want to delete {name} sub-category?</h3>
            </div>
            <div className='row'>
                <button onClick={handleDelete} className='btn btn-danger mt-1' type='primary'>Yes</button>
                <button onClick={() => history.push('/admin/subs')} className='btn btn-dark mt-1' type='primary'>No</button>
            </div>
        </div>
    )
};

export default DeleteSubCategory;
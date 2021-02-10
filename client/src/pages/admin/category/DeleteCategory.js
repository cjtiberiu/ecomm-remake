import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategory, removeCategory } from '../../../utility/dbCategory';

const DeleteCategory = props => {

    const { match, history } = props;
    const [name, setName] = useState('');
    const user = useSelector(state => state.user);

    // get the category details based on params
    useEffect(() => {
        getCategory(match.params.slug)
            .then(res => setName(res.data.category.name))
            .catch(err => console.log(err));
    }, [match.params.slug])

    // detele the category and display a succes message using toast
    const handleDelete = (e) => {
        e.preventDefault();

        if (user) {
            removeCategory(user.token, match.params.slug)
                .then(() => {
                    toast.success('Category deleted')
                    history.push('/admin/categories')
                })
                .catch(err => toast.error(err.response.data.message))
        }
    }

    return (
        <div className='col-md-10'>
            <div className='row'>
                <h3>Are you sure you want to delete {name} category?</h3>
            </div>
            <div className='row'>
                <button onClick={handleDelete} className='btn btn-danger mt-1' type='primary'>Yes</button>
                <button onClick={() => history.push('/admin/categories')} className='btn btn-dark mt-1' type='primary'>No</button>
            </div>
        </div>
    )
};

export default DeleteCategory;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../utility/dbCategory';
import { toast } from 'react-toastify';


const EditCategory = props => {

    const { match, history } = props;
    const [name, setName] = useState('');
    const user = useSelector(state => state.user);

    // get the category details based on params
    useEffect(() => {
        getCategory(match.params.slug)
            .then(res => setName(res.data.category.name))
            .catch(err => console.log(err));
    }, [])

    // update the new category
    const handleSubmit = (e) => {
        e.preventDefault();

        if (user) {
            updateCategory(user.token, name, match.params.slug)
                .then(res => {
                    setName('');
                    toast.success('Category Updated')
                    history.push('/admin/categories');
                })
                .catch(err => toast.error(err.message))
        }
    }

    return (
        <div className='col-md-10'>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    className='form-control pt-2 pb-2' 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Enter category name"
                    autoFocus
                />
                <button onClick={handleSubmit} className='btn btn-outline-dark mt-3' type='primary'>Edit category</button>

            </form>
        </div>
    )
};

export default EditCategory;
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createCategory } from '../../../utility/dbCategory';
import { toast } from 'react-toastify';

const CreateCategory = props => {


    const [name, setName] = useState('');
    const user = useSelector(state => state.user);
    const { history } = props;

    // create a new category
    const handleSubmit = (e) => {
        e.preventDefault();

        if (user) {
            // send the request for creating a new category if the length is > 2
            // then reset the component state
            if (name.length > 2) {
                createCategory(user.token, name)
                    .then((res) => {
                        setName('');
                        history.push('/admin/categories');
                        toast.success(`Category ${res.data.name} created`);
                    })
                    .catch(err => {
                        toast.error(err.response.data.message)
                    });
            } else {
                toast.error('Minimum category name length is 3');
            }

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
                <button onClick={handleSubmit} className='btn btn-outline-dark mt-3' type='primary'>Create category</button>

            </form>
        </div>
    )
};

export default CreateCategory;
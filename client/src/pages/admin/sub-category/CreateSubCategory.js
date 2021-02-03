import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSubCategory } from '../../../utility/dbSub';
import { toast } from 'react-toastify';

import { getCategories } from '../../../utility/dbCategory';

// Ant design
import { Select } from 'antd';
const { Option } = Select;

const CreateSubCategory = props => {


    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const user = useSelector(state => state.user);
    const { history } = props;

    useEffect(() => {
        getCategories()
            .then(res => setCategories(res.data.categories))
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user) {

            if (name.length > 2) {
                createSubCategory(user.token, name, category)
                    .then((res) => {
                        setName('');
                        history.push('/admin/subs');
                        toast.success(`Sub-Category ${res.data.name} created`);
                    })
                    .catch(err => {
                        toast.error(err.response.data.message)
                    });
            } else {
                toast.error('Minimum category name length is 3');
            }

        }
    }

    const onChange = (e) => {
        setCategory(e);
    }

    return (
        <div className='col-md-10'>
            <form onSubmit={handleSubmit}>

                <div className='row'>
                    
                    <input 
                        type='text' 
                        className='form-control pt-2 pb-2' 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Enter sub-category name"
                        autoFocus
                    />

                </div>

                <div className='row mt-3'>

                    <Select
                        style={{ width: 200 }}
                        placeholder="Select a category"
                        optionFilterProp="children"
                        onChange={onChange}
                    >
                        {
                            categories.map(el => {
                                return <Option key={el._id} value={`${el._id}`}>{el.name}</Option>
                            })
                        }
                    </Select>

                </div>

                <div className='row'>

                    <button onClick={handleSubmit} className='btn btn-outline-dark mt-3' type='primary'>Create sub-category</button>

                </div>

                
                
                

            </form>
        </div>
    )
};

export default CreateSubCategory;
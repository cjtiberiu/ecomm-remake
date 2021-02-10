import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSubCategory, updateSubCategory } from '../../../utility/dbSub';
import { getCategories } from '../../../utility/dbCategory';
import { toast } from 'react-toastify';

// Ant design
import { Select } from 'antd';
const { Option } = Select;


const EditSubCategory = props => {

    const { match, history } = props;
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const user = useSelector(state => state.user);

    useEffect(() => {
        
        getSubCategory(match.params.slug)
            .then(res => {
                setName(res.data.category.name);
                setCategory(res.data.category.parent)
            })
            .catch(err => console.log(err));

        getCategories()
            .then(res => setCategories(res.data.categories))
            .catch(err => console.log(err))
    }, [match.params.slug])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user) {
            updateSubCategory(user.token, name, category, match.params.slug)
                .then(res => {
                    setName('');
                    setCategory('');
                    toast.success('Category Updated')
                    history.push('/admin/subs');
                })
                .catch(err => toast.error(err.message))
        }
    }

    const onChange = e => {
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

                    {
                        !category ? null : (
                            <Select     
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                onChange={onChange}
                                defaultValue={category}
                            >
                                {
                                    categories.map(el => {
                                        return <Option key={el._id} value={`${el._id}`} selected={el._id === category} >{el.name}</Option>
                                    })
                                }
                            </Select>
                        )
                    }

                </div>

                
                <div className='row'>

                    <button onClick={handleSubmit} className='btn btn-outline-dark mt-3' type='primary'>Edit sub-category</button>

                </div>


            </form>
        </div>
    )
};

export default EditSubCategory;
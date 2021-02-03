import React, { useState, useEffect } from 'react';
import { getSubCategories } from '../../utility/dbSub';
import { getCategories } from '../../utility/dbCategory';

import ListSubCategories from './sub-category/ListSubCategories';
import SearchFilter from '../../components/forms/SearchFilter';

const AdminSubCategories = props => {

    const { history } = props;
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        getSubCategories()
            .then(res => {
                setSubCategories(res.data.sub);
            })
            .catch(err => console.log(err))

        getCategories()
            .then(res => setCategories(res.data.categories))
            .catch(err => console.log(err))
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();

        setKeyword(e.target.value.toLowerCase());
    }


    return (
        <div className='col-md-10'>
            <div className='row'>
                <div className='col-md-6'>
                    <h4>Manage sub-categories</h4>
                </div>

            </div>

            <div className='row'>

                <div className='col-md-3'>

                    <button onClick={() => history.push('/admin/subs/create')} className='btn btn-outline-dark' type='primary'>Create sub-category</button>

                </div>

                <div className='col-md-3'>
                    {/* <Input placeholder="Search categories" prefix={<SearchOutlined />} onChange={(e) => setSearch(e.target.value)} /> */}
                    <SearchFilter keyword={keyword} handleSearch={handleSearch} target='sub-categories' />
                </div>

            </div>
            
            <ListSubCategories subCategories={subCategories} categories={categories} keyword={keyword} />
        </div>
    )
};

export default AdminSubCategories;
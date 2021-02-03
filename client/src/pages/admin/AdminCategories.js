import React, { useState, useEffect } from 'react';
import { getCategories } from '../../utility/dbCategory';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import ListCategories from './category/ListCategories';
import SearchFilter from '../../components/forms/SearchFilter';

const AdminCategories = props => {

    const { history } = props;
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');

    // get categories from db
    useEffect(() => {
        getCategories()
            .then(res => {
                setCategories(res.data.categories);
            })
            .catch(err => console.log(err))
    }, [])

    // search through categories using the search input component
    const handleSearch = (e) => {
        e.preventDefault();

        setKeyword(e.target.value);
    }


    return (
        <div className='col-md-10'>
            <div className='row'>
                <div className='col-md-6'>
                    <h4>Manage categories</h4>
                </div>

            </div>

            <div className='row'>

                <div className='col-md-3'>

                    <button onClick={() => history.push('/admin/categories/create')} className='btn btn-outline-dark' type='primary'>Create category</button>

                </div>

                <div className='col-md-3'>
                    {/* <Input placeholder="Search categories" prefix={<SearchOutlined />} onChange={(e) => setSearch(e.target.value)} /> */}
                    <SearchFilter keyword={keyword} handleSearch={handleSearch} target='categories' />
                </div>

            </div>
            
            <ListCategories categories={categories} keyword={keyword} />
        </div>
    )
};

export default AdminCategories;
import React, { useState, useEffect } from 'react';
import { getCategories } from '../../utility/dbCategory';
//import { Menu } from 'antd';

const CategoryFilter = props => {

    const { Item } = props;
    const [categories, setCategories] = useState([]);

    // get
    useEffect(() => {
        getCategories()
            .then(res => setCategories(res.data.categories))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='d-flex flex-column'>
        {
            categories.map(el => {
                return <Item key={`${el._id}`}>{el.name}</Item>
            })
        }
        </div>
    )
};

export default CategoryFilter;
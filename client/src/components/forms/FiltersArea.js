import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Divider, Menu } from 'antd';

import SearchInput from './SearchInput';
import PriceFilter from './PriceFilter';
import CategoryFilter from './CategoryFilter';
import StarsFilter from './StarsFilter';
import ColorFilter from './ColorFilter';
import BrandFilter from './BrandFilter';

import { getCategories } from '../../utility/dbCategory';

const FiltersArea = props => {

    const { SubMenu } = Menu;
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const search = useSelector(state => state.search);
    const [selectedKeys, setSelectedKeys] = useState('all')

    // get the categories from the db that will be used with the select component
    useEffect(() => {
        getCategories()
            .then(res => setCategories(res.data.categories))
            .catch(err => console.log(err))
    }, [])

    // set the active menu component
    const handleClick = e => {
        setSelectedKeys(e.key);
    }

    return (
        
        <Menu
            onClick={handleClick}
            style={{ width: '100%', marginTop: '5vh'}}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme='light'
            className='p-1'
            selectedKeys={[selectedKeys]}
        >
            <h4 className='text-center'>Filters</h4>
            
            <SubMenu key='sub1' title='Price' className='pb-1'>
                <div className='w-100'>
                    <PriceFilter />
                </div>
            </SubMenu>


            <SubMenu key='sub2' title='Category' className='pb-2'>
                <Menu.Item onClick={e => dispatch({ type: 'SET_SEARCH_CATEGORY', payload: ''})} key={`all`}>All</Menu.Item>
                {
                    categories.map(el => {
                        return <Menu.Item onClick={e => dispatch({ type: 'SET_SEARCH_CATEGORY', payload: el._id})} key={`${el._id}`}>{el.name}</Menu.Item>
                    })    
                }
            </SubMenu>


            <SubMenu key='sub3' title='Rating' className='pb-2'>
                <StarsFilter />
            </SubMenu>
            
            <SubMenu key='sub4' title='Color' className='pb-2'>
                <ColorFilter />
            </SubMenu>


            <SubMenu key='sub5' title='Brand' className='pb-2'>
                <BrandFilter />
            </SubMenu>

            
            
        </Menu>
    )
};

export default FiltersArea;
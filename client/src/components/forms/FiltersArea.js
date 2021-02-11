import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'antd';

import PriceFilter from './PriceFilter';
import StarsFilter from './StarsFilter';
import ColorFilter from './ColorFilter';
import BrandFilter from './BrandFilter';

import { getCategories } from '../../utility/dbCategory';

const FiltersArea = props => {

    const { SubMenu } = Menu;
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const [selectedKeys, setSelectedKeys] = useState('all');
    const nav = useSelector(state => state.nav);

    // get the categories from the db that will be used with the select component
    useEffect(() => {
        
        getCategories()
            .then(res => setCategories(res.data.categories))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log(selectedKeys);
    }, [selectedKeys])

    // set the active menu component
    const handleClick = e => {
        console.log(e.key);
        setSelectedKeys(e.key);
    }

    

    return (
        
        <Menu
            onClick={handleClick}
            style={{ width: '100%', marginTop: '5vh', border: '1px solid rgba(2, 15, 27, 0.1)'}}
            defaultOpenKeys={['sub1', 'sub2']}
            mode="inline"
            theme='light'
            className='p-1'
            selectedKeys={[nav.selectedKeys]}
        >
            
            <SubMenu key='sub1' title='Price' className='pb-1'>
                <div className='w-100 pl-2 pr-2'>
                    <PriceFilter />
                </div>
            </SubMenu>


            <SubMenu key='sub2' title='Category' className='pb-2'>
                <Menu.Item 
                    onClick={e => {
                        dispatch({ type: 'SET_OPEN_MENU', payload: 'all'})
                        dispatch({ type: 'SET_SEARCH_CATEGORY', payload: ''});
                    }}
                    key={'all'}>All</Menu.Item>
                {
                    categories.map(el => {
                        return <Menu.Item 
                            onClick={e => {
                                dispatch({ type: 'SET_OPEN_MENU', payload: el._id });
                                dispatch({ type: 'SET_SEARCH_CATEGORY', payload: el._id})
                            }} 
                            key={`${el._id}`}>{el.name}</Menu.Item>
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
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio, Input, Row } from 'antd';

const brands = ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus', 'Dell'];

const BrandFilter = props => {

    const dispatch = useDispatch();
    const search = useSelector(state => state.search)

    // set the brand filter on redux state
    const onChange = e => {
        dispatch({
            type: 'SET_SEARCH_BRAND',
            payload: e.target.value
        })
    };

    return (

        <Radio.Group onChange={onChange} defaultValue={search.brand}>
            <Radio className='mb-2' value=''>All</Radio>
            {
                brands.map(el => {
                    return <Row className='mb-2' key={el}><Radio value={el}>{el}</Radio></Row>
                })
            }
        </Radio.Group>
        

    )
};

export default BrandFilter;
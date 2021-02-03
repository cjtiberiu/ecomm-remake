import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio, Input, Row } from 'antd';

const colors = ['Silver', 'Brown', 'Black', 'White', 'Blue'];

const ColorFilter = props => {

    const dispatch = useDispatch();
    const search = useSelector(state => state.search)

    // set the color filter on redux state
    const onChange = e => {
        dispatch({
            type: 'SET_SEARCH_COLOR',
            payload: e.target.value
        })
    };

    return (

        <Radio.Group onChange={onChange} defaultValue={search.color}>
            <Radio value='' className='mb-2'>All</Radio>
            {
                colors.map(el => {
                    return <Row className='mb-2' key={el}><Radio value={el}>{el}</Radio></Row>
                })
            }
        </Radio.Group>
        

    )
};

export default ColorFilter;
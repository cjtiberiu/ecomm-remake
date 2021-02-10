import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getPriceRange } from '../../utility/dbProduct';

//const { SubMenu, Item } = Menu;

const PriceFilter = props => {

    const dispatch = useDispatch();
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const search = useSelector(state => state.search);

    // get the min and max product prices from api endpoint
    // used to create the frontend price range component
    useEffect(() => {
        
        getPriceRange(search.query)
            .then(res => {
                setMinValue(res.data.minValue);
                setMaxValue(res.data.maxValue);
                dispatch({
                    type: 'SET_SEARCH_PRICE',
                    payload: [res.data.minValue, res.data.maxValue]
                })
                
            })
            .catch(err => console.log(err))
    }, [search.query, dispatch])

    return (
        
        <Slider 
            range={{ draggableTrack: true }} 
            tipFormatter={v => `${v}$`}
            value={search.price} 
            onChange={values => {
                dispatch({
                    type: 'SET_SEARCH_PRICE',
                    payload: values
                })
            }}
            className='ml-0'
            min={minValue} 
            max={maxValue} 
        />
        
    )
};

export default PriceFilter;
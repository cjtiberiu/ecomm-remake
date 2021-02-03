import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio, Row, Input } from 'antd';
import StarRatings from 'react-star-ratings';

const StarsFilter = props => {

    const [values, setValues] = useState([]);
    const dispatch = useDispatch();
    const search = useSelector(state => state.search);

    // set the number of selected stars on redux state
    const onChange = (e) => {
        dispatch({
            type: 'SET_SEARCH_STARS',
            payload: e.target.value
        })
    }

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    return (
        <Radio.Group onChange={onChange} defaultValue={search.stars}>
            <Row>
                <Radio value={5}>
                    <StarRatings
                        starDimension='15px'
                        rating={5}
                        starRatedColor="#b1b10f"
                        numberOfStars={5}
                    />
                </Radio>
            </Row>
            <Row>
                <Radio value={4}>
                    <StarRatings
                        starDimension='15px'
                        rating={4}
                        starRatedColor="#b1b10f"
                        numberOfStars={4}
                    />
                </Radio>
            </Row>
            <Row>
                <Radio value={3}>
                    <StarRatings
                        starDimension='15px'
                        rating={3}
                        starRatedColor="#b1b10f"
                        numberOfStars={3}
                    />
                </Radio>
            </Row>
            <Row>
                <Radio value={2}>
                    <StarRatings
                        starDimension='15px'
                        rating={2}
                        starRatedColor="#b1b10f"
                        numberOfStars={2}
                    />
                </Radio>
            </Row>
            <Row>
                <Radio value={1}>
                    <StarRatings
                        starDimension='15px'
                        rating={1}
                        starRatedColor="#b1b10f"
                        numberOfStars={1}
                    />
                </Radio>
            </Row>
            <Row>
                <Radio value=''>
                    All ratings
                </Radio>
            </Row>
        </Radio.Group>
    )
};

export default StarsFilter;
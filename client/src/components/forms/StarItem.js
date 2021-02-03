import React from 'react';
import StarRatings from 'react-star-ratings';

const StarItem = props => {

    return (
        <StarRatings
            rating={props.number}
            starRatedColor="#b1b10f"
            numberOfStars={props.number}
        />
    )
};

export default StarItem;
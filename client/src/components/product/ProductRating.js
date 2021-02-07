import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';

const ProductRating = props => {

    const { product } = props;
    const [rating, setRating] = useState(0);

    // calculate the average product rating based on the stars array
    useEffect(() => {

        if (product.ratings) {
            if (product.ratings.length === 0) {
                return;
            } else {
                let total = product.ratings.reduce((a, b) => {
                    return a + b.star
                }, 0);
    
                setRating(total / product.ratings.length);
            }
        } 

    })

    return (
        <div className='d-flex align-items-start w-100 justify-content-center'>
            <StarRatings
                rating={rating}
                starRatedColor="#b1b10f"
                numberOfStars={5}
                name={product._id}
                starDimension='20px'
            />
            <div style={{ fontSize: '16px', marginTop: -3, marginLeft: 10 }}>
            {/* {
                `${rating.toFixed(1)}`
            } */}
            </div>
        </div>
        
    )
};

export default ProductRating;
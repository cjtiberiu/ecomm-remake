import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { rateProduct, getProductRating, getProduct } from '../../utility/dbProduct';

const RatingModal = props => {

    const { ratingModal, setRatingModal, product, setProduct } = props;
    const user = useSelector(state => state.user);
    const [rating, setRating] = useState(0);

    useEffect(() => {

        if (user) {
            if (product._id !== undefined) {
                getProductRating(user.token, product._id)
                .then(res => {
                    setRating(res.data)
                })
                .catch(err => console.log(err))
            }
            
        }
    }, [product])

    return (

        <Modal 
            title='Leave product rating' 
            centered 
            visible={ratingModal} 
            onOk={() => {
                setRatingModal(false)
                rateProduct(user.token, product._id, rating)
                    .then(res => {
                        getProduct(product._id)
                            .then((res) => {
                                setProduct(res.data)
                                toast.success('Your rating has been submitted')
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => toast.error(err));
            }}
            onCancel={() => setRatingModal(false)}
        >
            <StarRatings
                rating={rating}
                starRatedColor="#b1b10f"
                numberOfStars={5}
                changeRating={(newRating, name) => setRating(newRating)}
                name={product._id}
            />
        </Modal>
    )
};

export default RatingModal;
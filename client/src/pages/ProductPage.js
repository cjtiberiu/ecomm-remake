import React, { useState, useEffect } from 'react';
import { getProduct } from '../utility/dbProduct';
import { Card, Divider } from 'antd';
import Tabs from '../components/product/Tabs';
import RelatedProducts from '../components/product/RelatedProducts';
import ProductDetails from '../components/product/ProductDetails';
import ProductRating from '../components/product/ProductRating';
import RatingModal from '../components/modal/RatingModal';


const ProductPage = props => {

    const { match, history } = props;

    const [product, setProduct] = useState({});
    const [bigImage, setBigImage] = useState('');
    const [carouselNumber, setCarouselNumber] = useState(0);
    const [ratingModal, setRatingModal] = useState(false);

    const { Meta } = Card;

    // get the product fron db based on params and set the default displayed image
    useEffect(() => {

        window.scrollTo(0, 0);
        
        getProduct(match.params.id)
            .then(res => {
                if (res.data.images.length > 0) {
                    setBigImage(res.data.images[0].url);
                } else {
                    setBigImage('https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png')
                }
                
                setProduct(res.data);
            })
            .catch(err => console.log(err));
    }, [match.params.id])

    
    const onChange = (number) => {
        if (product.images.length > 0) {
            setBigImage(product.images[number].url)
        }
    }

    return (
        <div className='container-fluid pb-5 mt-5'>
            <RatingModal product={product} ratingModal={ratingModal} setRatingModal={setRatingModal} setProduct={setProduct} />
            <div className='row mt-5'>
                
                <div className='col-md-7'>
                    <div className='row' style={{ 
                        height: '40vh', 
                        width: '100%', 
                        backgroundImage: `url(${bigImage})`, 
                        backgroundSize: '65%', 
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}></div>
                    {/* {
                        !product.images ? null : <ImageCarousel bigImage={bigImage} images={product.images.map(el => el.url)} onChange={onChange} number={carouselNumber} />
                    } */}
                    <div className='row justify-content-center'>
                        {
                            !product.images ? null : product.images.map((image, index) => {
                                return <img key={image.public_id} onClick={() => setBigImage(image.url)} style={{ marginRight: '2px', width: '100px', height: '90px', outline: `${image.url === bigImage ? '1px solid lightblue' : ''}`}} src={`${image.url}`} />
                            })
                        }
                    </div>

                    <Divider />

                    <Tabs description={product.description} />
                </div>

                <div className='col-md-4 d-flex flex-column align-items-center'>
                    <h1>{product.title}</h1>

                    <ProductRating product={product} />

                    <ProductDetails setRatingModal={setRatingModal} product={product} />

                </div>
            </div>
            <Divider />
            <div>
                {
                    !product.subs ? null : <RelatedProducts key={product._id} sub={product.subs[0]._id} productToRemove={product._id} />
                }
            </div>
        </div>
    )
};

export default ProductPage;
import React, { useState, useEffect } from 'react';
import { getRelated } from '../../utility/dbProduct';
import ProductCard from '../cards/ProductCard';

const RelatedProducts = props => {

    const { sub, productToRemove } = props;
    const [relatedProducts, setRelatedProducts] = useState([]);

    // get the related products for the currently selected product from api endpoint
    useEffect(() => {
        getRelated(sub)
            .then(res => setRelatedProducts(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='col-md-10'>
            <div className='row d-flex'>
                <h4>Related Products</h4>
            </div>
            <div className='row d-flex'>
                {
                    relatedProducts.length === 1 && (
                        <div className='m-5'>No related products to show</div>
                    )
                }
                {
                    relatedProducts.filter(product => product._id !== productToRemove).map(product => {
                        return (
                            <ProductCard key={product._id} product={product} />
                        )
                    })
                }
            </div>
            
        </div>
    )
};

export default RelatedProducts;
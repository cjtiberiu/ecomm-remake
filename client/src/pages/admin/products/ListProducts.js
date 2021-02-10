import React from 'react';
import { filteredArray } from '../../../utility/filters';
import ProductCard from '../../../components/cards/ProductCard';

const ListProducts = props => {

    const { products, keyword} = props;

    return (
        <div className='row mt-2 '>
                <div className='col-md-12 d-flex flex-wrap' style={{ overflowY: 'scroll', maxHeight: '70vh'}}>
                    {

                        filteredArray(products, keyword).map(el => {
                            return (

                                <ProductCard type='admin' key={el._id} product={el} />
                                
                                // <div className='border bg-light mb-1 d-flex justify-content-between align-items-center' key={el.slug}>
                                //     <div className='d-flex align-items-center w-25'>

                                //         <img src={el.images[0].url} style={{ width: '70px', height: 'auto'}} />
                                //         <div className='ml-2'>{el.title}</div>

                                //     </div>

                                //     <div>Stock: {el.quantity} </div>
                                //     <div className='d-flex align-items-center'>
                                //         <button 
                                //             className='btn btn-green'
                                //             onClick={() => history.push(`/admin/product/edit/${el._id}`)}
                                //             type="light" 
                                //             shape="round" 
                                //             size='small'
                                //         >Edit</button>
                                //         <button 
                                //             className='btn btn-danger'
                                //             onClick={() => history.push(`/admin/product/delete/${el._id}`)}
                                //             type="light" 
                                //             shape="round" 
                                //             size='small'
                                //         >Delete</button>
                                //     </div>
                                // </div>

                            )
                        })
                    }
                </div>
            </div>
    )
};

export default ListProducts;
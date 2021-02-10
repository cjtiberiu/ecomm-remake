import React from 'react';
import { useHistory } from 'react-router-dom';

import { filteredArray } from '../../../utility/filters';

const ListSubCategories = props => {

    const { subCategories, keyword, categories } = props;
    const history = useHistory();

    return (
        <div className='row mt-2 '>
                <div className='col-md-10 d-flex flex-column' style={{ overflowY: 'scroll', maxHeight: '70vh'}}>
                    {

                        filteredArray(subCategories, keyword).map(el => {
                            return (

                                <div className='border bg-light pl-1 mb-1 d-flex justify-content-between align-items-center' key={el.slug}>
                                    {
                                        categories.map(category => el.parent === category._id ? <div key={category._id}>{el.name} - {category.name}</div> : null)    
                                    }
                                    <div className='d-flex align-items-center'>
                                        <button 
                                            className='btn btn-green'
                                            onClick={() => history.push(`/admin/subs/edit/${el.slug}`)}
                                            type="light" 
                                            shape="round" 
                                            size='small'
                                        >Edit</button>
                                        <button 
                                            className='btn btn-danger'
                                            onClick={() => history.push(`/admin/subs/delete/${el.slug}`)}
                                            type="light" 
                                            shape="round" 
                                            size='small'
                                        >Delete</button>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
    )
};

export default ListSubCategories;
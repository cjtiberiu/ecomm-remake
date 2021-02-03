import React from 'react';
import { useHistory } from 'react-router-dom';

import { filteredArray } from '../../../utility/filters';

const ListCategories = props => {

    const { categories, keyword } = props;
    const history = useHistory();

    return (
        <div className='row mt-2 '>
                <div className='col-md-10 d-flex flex-column' style={{ overflowY: 'scroll', maxHeight: '70vh'}}>
                    {
                        filteredArray(categories, keyword).map(el => {
                                return (
                                    <div className='border bg-light pl-1 mb-1 d-flex justify-content-between align-items-center' key={el.slug}>
                                        <div>{el.name}</div>
                                        <div className='d-flex align-items-center'>
                                            <button 
                                                className='btn btn-green'
                                                onClick={() => history.push(`/admin/categories/edit/${el.slug}`)}
                                                type="light" 
                                                shape="round" 
                                                size='small'
                                            >Edit</button>
                                            <button 
                                                className='btn btn-danger'
                                                onClick={() => history.push(`/admin/categories/delete/${el.slug}`)}
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

export default ListCategories;
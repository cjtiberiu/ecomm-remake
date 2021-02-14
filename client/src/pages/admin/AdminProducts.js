import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ListProducts from './products/ListProducts';
import SearchFilter from '../../components/forms/SearchFilter';


import { getSortedProducts } from '../../utility/dbProduct';

const AdminProducts = props => {

    const { history } = props;
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);


    const handleSearch = (e) => {
        e.preventDefault();

        setKeyword(e.target.value.toLowerCase());
        
    }

    // get the products from db and display them using card component
    useEffect(() => {
        getSortedProducts('title', 'asc')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, []);

    


    return (
        <div className='col-md-10 pb-5'>
            <div className='row'>
                <div className='col-md-8'>
                    <h4>Manage products</h4>
                </div>

            </div>

            <div className='row'>

                <div className='col-md-3'>

                    <button onClick={() => history.push('/admin/products/create')} className='btn btn-outline-dark' type='primary'>Create Product</button>

                </div>

                <div className='col-md-3'>
                    {/* <Input placeholder="Search categories" prefix={<SearchOutlined />} onChange={(e) => setSearch(e.target.value)} /> */}
                    <SearchFilter keyword={keyword} handleSearch={handleSearch} target='products' />
                </div>

            </div>
            
            <ListProducts products={products} keyword={keyword} />

            
        </div>
    )
};

export default AdminProducts;
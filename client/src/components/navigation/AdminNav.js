import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import './AdminNav.css';

const AdminNav = () => {

    const [displayCategories, setDisplayCategories] = useState(false);
    const [displaySubCategories, setDisplaySubCategories] = useState(false);
    const [displayProducts, setDisplayProducts] = useState(false);

    return (
        <nav>
            <ul className='nav flex-column'>
                <li className='nav-item'>
                    <Link to='/admin/dashboard' className='nav-link border border-bottom-5'>Dashboard</Link> 
                </li>

                <li className='nav-item'>
                    <Link to='/admin/changepassword' className='nav-link border border-bottom-5'>Change password</Link> 
                </li>

                <li className='nav-item'>
                    
                    <Link to='/admin/categories' className='nav-link border border-bottom-5 d-flex align-items-center justify-content-between' onClick={() => setDisplayCategories(!displayCategories)}>
                        Categories
                        {/* {
                            displayCategories ? <CaretUpOutlined /> : <CaretDownOutlined />
                        } */}
                    </Link> 
                    {/* <div className={displayCategories ? 'd-flex flex-column align-items-center pl-2 p-1' : 'd-none'} style={{ transition: 'all 1.5s' }}>
                        <Link className='pb-2' to='/admin/categories'>List categories</Link>
                        <Link className='pb-2' to='/admin/categories'>Add category</Link>
                        <Link className='pb-2' to='/admin/categories'>Update category</Link>
                        <Link className='pb-2' to='/admin/categories'>Delete category</Link>
                    </div> */}
                    
                </li>

                <li className='nav-item'>
                    
                    <Link to='/admin/subs' className='nav-link border border-bottom-5 d-flex align-items-center justify-content-between' onClick={() => setDisplaySubCategories(!displaySubCategories)}>
                        Sub Categories
                        {/* {
                            displaySubCategories ? <CaretUpOutlined /> : <CaretDownOutlined />
                        } */}
                    </Link>                     
                    
                    {/* <Link className={displaySubCategories ? 'd-flex flex-column pl-2 pb-1' : 'd-none'} to='/admin/subcategories'>List Sub-Categories</Link>
                    <Link className={displaySubCategories ? 'd-flex flex-column pl-2 pb-1' : 'd-none'} to='/admin/subcategories'>Add Sub-Category</Link>
                    <Link className={displaySubCategories ? 'd-flex flex-column pl-2 pb-1' : 'd-none'} to='/admin/subcategories'>Update Sub-Category</Link>
                    <Link className={displaySubCategories ? 'd-flex flex-column pl-2 pb-1' : 'd-none'} to='/admin/subcategories'>Delete Sub-Category</Link> */}
                </li>

                <li className='nav-item'>
                    <Link to='/admin/products' className='nav-link border border-bottom-5 d-flex align-items-center justify-content-between' onClick={() => setDisplayProducts(!displayProducts)}>
                        Products
                        {/* {
                            displayProducts ? <CaretUpOutlined /> : <CaretDownOutlined />
                        } */}
                    </Link>                     
                    {/* <Link className={displayProducts ? 'd-flex flex-column pl-2 pb-1' : 'd-none'} to='/admin/products'>List Products</Link>
                    <Link className={displayProducts ? 'd-flex flex-column pl-2 pb-1' : 'd-none'} to='/admin/products'>Add Product</Link>
                    <Link className={displayProducts ? 'd-flex flex-column pl-2 pb-1' : 'd-none'} to='/admin/products'>Update Product</Link>
                    <Link className={displayProducts ? 'd-flex flex-column pl-2 pb-1' : 'd-none'} to='/admin/products'>Delete Product</Link> */}
                </li>

                <li className='nav-item'>
                    <Link to='/admin/orders' className='nav-link border border-bottom-5'>Orders</Link> 
                </li>

                <li className='nav-item'>
                    <Link to='/admin/coupons' className='nav-link border border-bottom-5'>Coupons</Link> 
                </li>
            </ul>
        </nav>
    )
}

export default AdminNav;
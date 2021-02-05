import React from 'react';
import { Route } from 'react-router-dom';

import AdminNav from '../../components/navigation/AdminNav';
import AdminCategories from './AdminCategories';
import AdminSubCategories from './AdminSubCategories';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import ChangePassword from '../user/ChangePassword';

import CreateCategory from './category/CreateCategory';
import EditCategory from './category/EditCategory.js';
import DeleteCategory from './category/DeleteCategory';

import CreateSubCategory from './sub-category/CreateSubCategory';
import EditSubCategory from './sub-category/EditSubCategory.js';
import DeleteSubCategory from './sub-category/DeleteSubCategory.js';

import ProductCreate from './products/ProductCreate';
import DeleteProduct from './products/DeleteProduct';
import EditProduct from './products/EditProduct';

import OrderDetails from './OrderDetails';


const Home = () => {
    return (
        <div className='col-md-10'>Admin Dashboard</div>
    )
};


const AdminDashboard = () => {

    return (
        <div className='container-fluid mt-3'>
            <div className='row pb-2'>
                <div className='col'>
                    <h3>Admin Dashboard</h3>
                </div> 
            </div>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>
                <Route exact path='/admin/dashboard' component={Home} />
                <Route exact path='/admin/changepassword' component={ChangePassword} />

                <Route exact path='/admin/categories' component={AdminCategories} />
                <Route exact path='/admin/categories/create' component={CreateCategory} />
                <Route exact path='/admin/categories/edit/:slug' component={EditCategory} /> 
                <Route exact path='/admin/categories/delete/:slug' component={DeleteCategory} />              

                <Route exact path='/admin/subs' component={AdminSubCategories} />
                <Route exact path='/admin/subs/create' component={CreateSubCategory} />
                <Route exact path='/admin/subs/edit/:slug' component={EditSubCategory} />
                <Route exact path='/admin/subs/delete/:slug' component={DeleteSubCategory} />


                <Route exact path='/admin/products' component={AdminProducts} />
                <Route exact path='/admin/products/create' component={ProductCreate} />
                <Route exact path='/admin/product/delete/:id' component={DeleteProduct} />
                <Route exact path='/admin/product/edit/:id' component={EditProduct} />
                <Route exact path='/admin/orders' component={AdminOrders} />

                <Route exact path='/admin/orders/:orderid' component={OrderDetails} />

            </div>
        </div>
    )
};

export default AdminDashboard;
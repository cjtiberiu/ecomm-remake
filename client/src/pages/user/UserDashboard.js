import React from 'react';
import { Route } from 'react-router-dom';
import OrderDetails from './OrderDetails';
import UserNav from '../../components/navigation/UserNav';
import ChangePassword from './ChangePassword';
import Wishlist from './Wishlist';
import Orders from './Orders';

const Home = () => {
    return (
        <h5>User Dashboard</h5>
    )
}

const UserDashboard = () => {

    return (
        <div className='container-fluid mt-2'>
            <div className='row pb-2'>
                <div className='col'>
                    <h3>User control panel</h3>
                </div> 
            </div>
            <div className='row'>
                <div className='col-md-2'>
                    <UserNav />
                </div>
                <Route exact path='/user/dashboard' component={Home} />
                <Route exact path='/user/changepassword' component={ChangePassword} />
                <Route exact path='/user/wishlist' component={Wishlist} />
                <Route exact path='/user/orders' component={Orders} />
                <Route exact path='/user/orders/:orderid' component={OrderDetails} />
            </div>
        </div>
    )
};

export default UserDashboard;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const UserPrivateRoute = ({ ...rest }) => {
    const user = useSelector(state => state.user);

    // check if there is a logged in user to acces the private '/user' routes
    return user && user.token ? (
        <Route {...rest} />
    ) : (
        <Redirect to='/' />
    )
};

export default UserPrivateRoute;
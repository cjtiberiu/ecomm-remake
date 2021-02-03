import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

import { getAdmin } from '../../utility/dbAuth';

const AdminPrivateRoute = ({ ...rest }) => {
    const user = useSelector(state => state.user);
    const [ok, setOk] = useState(false);

    // check in the backend if the current user is admin
    useEffect(() => {
        if (user && user.token) {
            getAdmin(user.token)
                .then(res => {
                    setOk(true);
                })
                .catch(err => {
                    setOk(false);
                })
        }

    }, [user])

    // if user is admin allow acces to '/admin' routes else redirect to homepage
    return ok ? (
        <Route {...rest} />
    ) : (
        <Redirect to='/' />
    )
};

export default AdminPrivateRoute;
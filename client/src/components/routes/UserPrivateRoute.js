import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
      <Route {...rest} render={(props) => (
        user && user.token 
            ? <Component {...props} /> 
            : <LoadingToRedirect />
      )} />
      
  )
};

export default UserRoute;

import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'
import { token } from './API_And_FUNCTIONS/Config';


//Checking whether user is authenticated and controls routes accordingly
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} component={(props) => (
            //if token is there allow the route
            token ? (
                // localStorage.getItem('token') !== null ? (
                <Component {...props} />
            ) :
                // if no token redirect to login
                (
                    <Redirect to="/login" />
                )
        )} />
    )
}

export default PrivateRoute
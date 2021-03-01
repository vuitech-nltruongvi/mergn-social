// Libraries
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

// Context
import {AuthContext} from '../context/auth';

const AuthRoot = ({component: Component, ...rest}) => {
    const {user} = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => user ? <Redirect to='/' /> : <Component {...props} />}
        />
    );
};

AuthRoot.propTypes = {};

export default AuthRoot;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        localStorage.getItem('politicoToken') ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export default PrivateRoute;

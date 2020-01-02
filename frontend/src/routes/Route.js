import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

import AuthLayout from '~/pages/_layouts/Auth';
import DefaultLayout from '~/pages/_layouts/Default';

import { store } from '~/store';

export default function RouteLock({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/students" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteLock.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteLock.defaultProps = {
  isPrivate: false,
};

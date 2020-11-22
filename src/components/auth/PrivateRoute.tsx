// core
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

// store
import { RootState } from '../../store';

// ts
interface Props extends RouteProps {
  component: any;
}


const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Route {...rest} render={props => authenticated ? <Component {...props} /> : <Redirect to="/signin" />} />
  );
}

export default PrivateRoute;
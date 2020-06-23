import React from "react";
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from "react-router-dom";

import { useAuth } from "~/hooks/auth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  if (user && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  if (!user && isPrivate) {
    return <Redirect to="/" />;
  }

  return <ReactDOMRoute {...rest} render={() => <Component />} />;
};

export default Route;

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isLogin } from "../../utils/token";

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (isLogin()) {
          return <Component {...routeProps} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { to: routeProps.location.pathname },
              }}
            />
          );
        }
      }}
    />
  );
}

export default AuthRoute;

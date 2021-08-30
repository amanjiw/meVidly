import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
class ProtectedRoute extends Component {
  render() {
    const { path, component: Component, render } = this.props;
    return (
      <Route
        path={path}
        render={(props) => {
          if (!getCurrentUser())
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  }
}

export default ProtectedRoute;

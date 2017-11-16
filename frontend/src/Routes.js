import React from "react";
import { Route, Switch } from "react-router-dom";
import BlueGreenComponent from "./components/BlueGreenComponent";
import CopyImageComponent from "./components/CopyImageComponent";
import CreateImageComponent from "./components/CreateImageComponent";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import StartInstance from "./components/StartInstance";

export default ({ childProps }) => (
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Login} props={childProps} />
    <AuthenticatedRoute
      path="/blue-green"
      exact
      component={BlueGreenComponent}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/create-image"
      exact
      component={CreateImageComponent}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/copy-image"
      exact
      component={CopyImageComponent}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/start-instance"
      exact
      component={StartInstance}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes. */}
    <Route component={NotFound} />
  </Switch>
);

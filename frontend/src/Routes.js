import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import UATToProd from "./containers/UATToProd";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Login} props={childProps} />
    <AuthenticatedRoute path="/dashboard" exact component={Home} props={childProps} />
    <AuthenticatedRoute path="/UATToProd" exact component={UATToProd} props={childProps} />
    { /* Finally, catch all unmatched routes. */ }
    <Route component={NotFound} />
  </Switch>;
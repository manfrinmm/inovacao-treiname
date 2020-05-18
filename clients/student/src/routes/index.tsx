import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "~/pages/Dashboard";

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

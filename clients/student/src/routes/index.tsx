import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SignIn from "~/pages/Auth/SignIn";
import Course from "~/pages/Course";
import Dashboard from "~/pages/Dashboard";
import DefaultLayouts from "~/styles/_layouts/DefaultLayouts";

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <DefaultLayouts>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/course/:course_id" component={Course} />
      </DefaultLayouts>
    </Switch>
  </BrowserRouter>
);

export default Routes;

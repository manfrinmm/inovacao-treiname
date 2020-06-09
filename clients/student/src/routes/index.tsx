import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import SignIn from "~/pages/Auth/SignIn";
import Course from "~/pages/Course";
import Dashboard from "~/pages/Dashboard";
import Exame from "~/pages/Exame";
import DefaultLayouts from "~/styles/_layouts/DefaultLayouts";

import Route from "./Routes";

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <DefaultLayouts>
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/course/:course_id" component={Course} isPrivate />
        <Route path="/exame" component={Exame} isPrivate />
      </DefaultLayouts>
    </Switch>
  </BrowserRouter>
);

export default Routes;

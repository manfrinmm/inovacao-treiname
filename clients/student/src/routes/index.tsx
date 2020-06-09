import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import SignIn from "~/pages/Auth/SignIn";
import Course from "~/pages/Course";
import Dashboard from "~/pages/Dashboard";
import Exame from "~/pages/Exame";
import Profile from "~/pages/Profile";
import DefaultLayouts from "~/styles/_layouts/DefaultLayouts";

import Route from "./Routes";

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <DefaultLayouts>
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />
        <Route path="/course/:course_id" exact component={Course} isPrivate />
        <Route path="/course/:course_id/exam" component={Exame} isPrivate />
      </DefaultLayouts>
    </Switch>
  </BrowserRouter>
);

export default Routes;

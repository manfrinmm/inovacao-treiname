import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import SignIn from "~/pages/Auth/SignIn";
import Course from "~/pages/Course";
import Dashboard from "~/pages/Dashboard";
import Exame from "~/pages/Exame";
import ExameResult from "~/pages/ExameResult";
import Profile from "~/pages/Profile";
import DefaultLayouts from "~/styles/_layouts/DefaultLayouts";

import Route from "./Route";

const Routes: React.FC = () => (
  <BrowserRouter>
    <DefaultLayouts>
      <Switch>
        <Route path="/" exact component={SignIn} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />
        <Route path="/course/:course_id" exact component={Course} isPrivate />
        <Route path="/course/:course_id/exam" component={Exame} isPrivate />
        <Route
          path="/exam/:submit_id/result"
          component={ExameResult}
          isPrivate
        />

        <Redirect to="/dashboard" />
      </Switch>
    </DefaultLayouts>
  </BrowserRouter>
);

export default Routes;

import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import Course from "~/pages/Course";
import Courses from "~/pages/Courses";
import Dashboard from "~/pages/Dashboard";
import Examination from "~/pages/Examination";
import SignIn from "~/pages/SignIn";
import Student from "~/pages/Student";
import Students from "~/pages/Students";
import DefaultLayout from "~/styles/_layouts/DefaultLayout";

import Route from "./Route";

const Routes: React.FC = () => (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        <Route path="/" exact component={SignIn} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/students" component={Students} isPrivate />
        <Route path="/student/:user_id" component={Student} isPrivate />
        <Route path="/courses" component={Courses} isPrivate />
        <Route path="/course" exact component={Course} isPrivate />
        <Route path="/course/:course_id" component={Course} isPrivate />
        <Route path="/examination" component={Examination} isPrivate />
        <Redirect to="/dashboard" />
        {/* <Route path="*" component={Dashboard} /> */}
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);

export default Routes;

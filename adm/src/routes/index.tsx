import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Course from "~/pages/Course";
import Courses from "~/pages/Courses";
import Dashboard from "~/pages/Dashboard";
import Examination from "~/pages/Examination";
import Student from "~/pages/Student";
import Students from "~/pages/Students";
import DefaultLayout from "~/styles/_layouts/DefaultLayout";

const Routes: React.FC = () => (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/students" component={Students} />
        <Route path="/student/:user_id" component={Student} />
        <Route path="/courses" component={Courses} />
        <Route path="/course" component={Course} />
        <Route path="/examination" component={Examination} />
        <Redirect to="/dashboard" />
        {/* <Route path="*" component={Dashboard} /> */}
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);

export default Routes;

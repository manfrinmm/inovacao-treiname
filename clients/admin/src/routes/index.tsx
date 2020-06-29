import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import Course from "~/pages/Course";
import Courses from "~/pages/Courses";
import Dashboard from "~/pages/Dashboard";
import ExameResult from "~/pages/ExameResult";
import Examination from "~/pages/Examination";
import Profile from "~/pages/Profile";
import ReportCourses from "~/pages/ReportCourses";
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
        <Route path="/profile" component={Profile} isPrivate />
        <Route path="/students" component={Students} isPrivate />
        <Route path="/student/:user_id" component={Student} isPrivate />
        <Route path="/courses" component={Courses} isPrivate />
        <Route path="/course" exact component={Course} isPrivate />
        <Route path="/course/:course_id" component={Course} isPrivate />
        <Route path="/examination" component={Examination} isPrivate />
        <Route path="/report-courses" component={ReportCourses} isPrivate />
        <Route
          path="/exam/:submit_id/result"
          component={ExameResult}
          isPrivate
        />

        <Redirect to="/dashboard" />
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);

export default Routes;

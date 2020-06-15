import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SignIn from "~/pages/Auth/SignIn";
import SignUp from "~/pages/Auth/SignUp";
import Certification from "~/pages/Certification";
import CertificationDetail from "~/pages/CertificationDetail";
import Course from "~/pages/Course";
import Home from "~/pages/Home";
import DefaultLayout from "~/styles/_layouts/DefaultLayout";

const Routes: React.FC = () => (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/certification" exact component={Certification} />
        <Route
          path="/certification/:certification_id"
          component={CertificationDetail}
        />
        <Route path="/course/:course_id" component={Course} />
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);

export default Routes;

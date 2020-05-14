import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Certification from "~/pages/Certification";
import Course from "~/pages/Course";
import Home from "~/pages/Home";
import DefaultLayout from "~/styles/_layouts/DefaultLayout";

const Routes: React.FC = () => (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/certification" component={Certification} />
        <Route path="/course/:course_id" component={Course} />
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);

export default Routes;

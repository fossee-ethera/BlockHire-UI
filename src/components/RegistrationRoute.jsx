import React from "react";
import { Switch, Route } from "react-router";
import jobSeekerRegistrationPage from "./Layout/jobSeekerRegistrationLayout";
import companyRegistrationPage from "./Layout/companyRegistrationLayout";
import HomePage from "./HomePage";
// to not get confused with the History component in react-router.

const RegistrationRoutes = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        path="/JobSeekerRegistration"
        exact
        component={jobSeekerRegistrationPage}
      />
      <Route
        path="/CompanyRegistration"
        exact
        component={companyRegistrationPage}
      />
    </Switch>
  </React.Fragment>
);

export default RegistrationRoutes;

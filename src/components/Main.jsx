import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import jobSeekerRegistrationPage from "./Layout/jobSeekerRegistrationLayout";
import companyRegistrationPage from "./Layout/companyRegistrationLayout";
import HomePage from "./HomePage";
import JobSeekerProfile from "./jobseeker/EditProfilePage";
import CompanyProfile from "./company/EditProfilePage";
import MainJobSeeker from "./jobseeker/MainJobSeeker";
import MainCompany from "./company/MainCompany";
import MinimalProfileView from "./company/MinimalProfileView";

import CertificateVerification from "./company/CertificateVerification";

// to not get confused with the History component in react-router.

const Main = () => (
  <Router>
    <Switch>
	<Route path="/profileview/verify/:cswarmid/:ccategory" 		component={CertificateVerification} />
      <Route path="/profileview/:user_id" component={MinimalProfileView} />
      <Route exact path="/jobs" component={MainCompany} />
      <Route exact path="/account" component={MainCompany} />
      {/* <Route path="/validation" component={MainCompany} /> */}
      <Route exact path="/notifications" component={MainCompany} />
      <Route exact path="/jobseeker/profile" component={MainJobSeeker} />
      <Route exact path="/company/profile" component={MainCompany} />
      <Route exact path="/" component={HomePage} />
      <Route
        exact
        path="/JobSeekerRegistration"
        component={jobSeekerRegistrationPage}
      />
      <Route
        exact
        path="/CompanyRegistration"
        component={companyRegistrationPage}
      />
    </Switch>
  </Router>
);

export default Main;

//after user logs in
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import TopBar from "./TopBar";
import { Switch, Route } from "react-router";
import Jobs from "./Jobs";
import Account from "./Account";
import Notifications from "./Notifications";
import EditProfilePage from "./EditProfilePage";

const MainJobSeeker = () => {
  if (sessionStorage.getItem("LoggedUser") === null) {
    return <div>Page not found!</div>;
  } else {
    return (
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/jobseeker/profile" component={EditProfilePage} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/notifications" component={Notifications} />
        </Switch>
      </Router>
    );
  }
};

export default MainJobSeeker;

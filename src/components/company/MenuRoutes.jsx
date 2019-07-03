import React from "react";
import { Switch, Route } from "react-router";
import EditProfilePage from "./EditProfilePage";
import Jobs from "./Jobs";
import Account from "./Account";
import Notifications from "./Notifications";
import Validation from "./Validation";

// to not get confused with the History component in react-router.

const Routes = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={EditProfilePage} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/account" component={Account} />
      <Route path="/validation" component={Validation} />
      <Route path="/notifications" component={Notifications} />
    </Switch>
  </React.Fragment>
);

export default Routes;

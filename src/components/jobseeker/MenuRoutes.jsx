import React from "react";
import { Switch, Route } from "react-router";
import EditProfilePage from "./EditProfilePage";
import Jobs from "./Jobs";
import Account from "./Account";
import Notifications from "./Notifications";
// to not get confused with the History component in react-router.

const MenuRoutes = () => (
  <React.Fragment>
    <Switch>
      <Route path="/profile" component={EditProfilePage} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/account" component={Account} />
      <Route path="/notifications" component={Notifications} />
    </Switch>
  </React.Fragment>
);

export default MenuRoutes;

//after company logs in
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import TopBar from "./TopBar";
import { Switch, Route } from "react-router";
import EditProfilePage from "./EditProfilePage";
import Jobs from "./Jobs";
import Account from "./Account";
import Notifications from "./Notifications";
import Validation from "./Validation";

import MinimalProfileView from "./MinimalProfileView";

const MainCompany = () => {
  if (sessionStorage.getItem("LoggedUser") === null) {
    return <div>Page not found!</div>;
  } else {
    return (
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/company/profile" component={EditProfilePage} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/account" component={Account} />
          <Route path="/validation" component={Validation} />
          <Route exact path="/notifications" component={Notifications} />
          <Route path="/profileview/:user_id" component={MinimalProfileView} />
        </Switch>
      </Router>
    );
  }
};

export default MainCompany;

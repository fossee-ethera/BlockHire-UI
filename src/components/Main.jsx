//after clicking sign in
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import RegistrationRoute from "./RegistrationRoute";

const Main = () => (
  <Router>
    <RegistrationRoute />
  </Router>
);

export default Main;

//after user logs in
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import TopBar from "./TopBar";
import Routes from "./Routes";

const Main = () => (
  <Router>
    <TopBar />
    <Routes />
  </Router>
);

export default Main;

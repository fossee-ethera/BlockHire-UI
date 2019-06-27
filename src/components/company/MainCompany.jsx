//after company logs in
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import TopBar from "./TopBar";
import Routes from "./Routes";

const MainCompany = () => (
  <Router>
    <TopBar />
    <Routes />
  </Router>
);

export default MainCompany;

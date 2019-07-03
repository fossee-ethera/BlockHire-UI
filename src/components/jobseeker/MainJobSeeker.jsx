//after user logs in
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import TopBar from "./TopBar";
import MenuRoutes from "../jobseeker/MenuRoutes";

const MainJobSeeker = () => (
  <Router>
    <TopBar />
    <MenuRoutes />
  </Router>
);

export default MainJobSeeker;

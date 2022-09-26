import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import SignIn from "../views/pages/common/sign/SignIn";
import SignUp from "../views/pages/common/sign/SignUp";

import Dashboard from "../views/pages/auth/dashboard/Dashboard";
import Campaign from "../views/pages/auth/campaign/Campaign";
import NewCampaign from "../views/pages/auth/campaign/new/NewCampaign";

const PagesRoutes = () => {
    
    return (
        <Router basename='/' >
            <Routes>
                {/* AUTH PAGES */}
                <Route exact path='dashboard'>
                  <Route exact path='/dashboard/' element={<Dashboard />} ></Route>
                </Route>
                <Route exact path='campaign'>
                  <Route exact path='/campaign/' element={<Campaign />} ></Route>
                </Route>
                <Route exact path='campaign'>
                  <Route exact path='/campaign/create' element={<NewCampaign />} ></Route>
                </Route>


                {/* PAGES */}
                <Route exact path="/" element={<SignIn />}></Route>
                <Route exact path="/sign-in" element={<SignIn />}></Route>
                <Route exact path="/sign-up" element={<SignUp />}></Route>
            </Routes>
        </Router>
    );
}

export default PagesRoutes
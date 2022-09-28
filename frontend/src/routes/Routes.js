import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RouteRequiresLogin from './RouteRequiresLogin';

// PAGES
import SignIn from "../views/pages/common/sign/SignIn";
import SignUp from "../views/pages/common/sign/SignUp";

import Dashboard from "../views/pages/auth/dashboard/Dashboard";
import Campaign from "../views/pages/auth/campaign/Campaign";
import NewCampaign from "../views/pages/auth/campaign/new/NewCampaign";
import EditCampaign from "../views/pages/auth/campaign/edit/EditCampaign";
import CampaignOutput from '../views/pages/auth/campaign-output/CampaignOutput';
import Report from "../views/pages/auth/report/Report";
import LinkSetting from "../views/pages/auth/link-setting/LinkSetting";
import NewLinkSetting from "../views/pages/auth/link-setting/new/NewLinkSetting";
import InputCode from "../views/pages/auth/input-code/InputCode";
import Setting from "../views/pages/auth/setting/Setting";

const PagesRoutes = () => {
    
    return (
        <Router basename='/' >
            <Routes>
                {/* AUTH PAGES */}
                <Route exact path='dashboard' element={<RouteRequiresLogin />}>
                  <Route exact path='/dashboard/' element={<Dashboard />} ></Route>
                </Route>
                <Route exact path='campaign' element={<RouteRequiresLogin />}>
                  <Route exact path='/campaign/' element={<Campaign />} ></Route>
                </Route>
                <Route exact path='campaign' element={<RouteRequiresLogin />}>
                  <Route exact path='/campaign/create' element={<NewCampaign />} ></Route>
                </Route>
                <Route exact path='campaign' element={<RouteRequiresLogin />}>
                  <Route exact path='/campaign/edit/:id' element={<EditCampaign />} ></Route>
                </Route>
                <Route exact path='campaign-output' element={<RouteRequiresLogin />}>
                  <Route exact path='/campaign-output' element={<CampaignOutput />} ></Route>
                </Route>
                <Route exact path='report' element={<RouteRequiresLogin />}>
                  <Route exact path='/report' element={<Report />} ></Route>
                </Route>
                <Route exact path='link-setting' element={<RouteRequiresLogin />}>
                  <Route exact path='/link-setting/' element={<LinkSetting />} ></Route>
                </Route>
                <Route exact path='link-setting' element={<RouteRequiresLogin />}>
                  <Route exact path='/link-setting/create' element={<NewLinkSetting />} ></Route>
                </Route>
                <Route exact path='input-code' element={<RouteRequiresLogin />}>
                  <Route exact path='/input-code' element={<InputCode />} ></Route>
                </Route>
                <Route exact path='setting' element={<RouteRequiresLogin />}>
                  <Route exact path='/setting' element={<Setting />} ></Route>
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
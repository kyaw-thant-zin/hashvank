import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import SignIn from "../views/pages/common/SignIn";
import SignUp from "../views/pages/common/SignUp";

const PagesRoutes = () => {
    
    return (
        <Router basename='/' >
            <Routes>
                {/* AUTH PAGES */}



                {/* PAGES */}
                <Route exact path="/" element={<SignIn />}></Route>
                <Route exact path="/sign-in" element={<SignIn />}></Route>
                <Route exact path="/sign-up" element={<SignUp />}></Route>
            </Routes>
        </Router>
    );
}

export default PagesRoutes
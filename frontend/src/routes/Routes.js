import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import SignIn from "../views/pages/common/SignIn";

const PagesRoutes = () => {
    return (
        <Router basename='/' >
            <Routes>
                {/* AUTH PAGES */}



                {/* PAGES */}
                <Route exact path="/" element={<SignIn />}></Route>
                <Route exact path="/sign-in" element={<SignIn />}></Route>
            </Routes>
        </Router>
    );
}

export default PagesRoutes
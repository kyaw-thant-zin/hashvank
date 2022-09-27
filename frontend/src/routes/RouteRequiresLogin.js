import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'

const RouteRequiresLogin = () => {
   
    const { user } = useSelector((state) => state.auth)
    
    React.useEffect(() => {

    }, [user])

    return user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default RouteRequiresLogin;
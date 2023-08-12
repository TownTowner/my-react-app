import { Navigate, Route, matchRoutes, useLocation, useNavigate, useParams } from 'react-router-dom';

import { authServiceInstance } from '../services';
import { useEffect, useState } from 'react';


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} element={
        !authServiceInstance.currentUserValue ?

            // not logged in so redirect to login page with the return url
            // ?v5: return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            <Navigate to='/login' state />

            // authorised so return component
            : <Component />
    } />
);

// export const ProtectedRoute = ({ component: Component, ...rest }) => {
//     <Route {...rest} element={(props) => {
//         const currentUser = authServiceInstance.currentUserValue;

//         if (!currentUser) {
//             // not logged in so redirect to login page with the return url
//             // ?v5: return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//             return <Navigate to='/login' state />;
//         }

//         // authorised so return component
//         return <Component {...props} />
//     }} />
// );

function UserGaurd({ component: Component }) {
    let params = useParams();
    const currentUser = authServiceInstance.currentUserValue;

    if (!currentUser) {
        // not logged in so redirect to login page with the return url
        // ?v5: return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        return <Navigate to='/login' state />;
    }

    // authorised so return component
    return <Component {...params} />
}

/**
 * https://juejin.cn/post/7195572628958167095
 * @param param0 
 * @returns 
 */
const AuthRoute = ({ children }: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentUser = authServiceInstance.currentUserValue;

    useEffect(() => {
        if (!currentUser)
            navigate("/login", { state: { from: location } });
    }, [currentUser, location.pathname]);

    return children;
};
export default AuthRoute;
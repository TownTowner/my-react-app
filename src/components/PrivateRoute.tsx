import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom';

import { authServiceInstance } from '../services';
import { useEffect } from 'react';


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
    }, [currentUser, location, navigate]);

    return children;
};
export default AuthRoute;
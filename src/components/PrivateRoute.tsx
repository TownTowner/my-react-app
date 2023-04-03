import { Route, Redirect } from 'react-router-dom';

import { AuthService } from '../services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = AuthService.prototype.currentUserValue;
        console.log('PrivateRoute,', currentUser===null);
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)
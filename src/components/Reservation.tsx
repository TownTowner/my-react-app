import React from 'react';

import { authServiceInstance, IUser } from '../services';

class ReservationPage extends React.Component<any, { currentUser: IUser, reservations: any[] }> {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: authServiceInstance.currentUserValue,
            reservations: null
        };
    }

    componentDidMount() {
        console.log('ReservationPage didmount');
        // userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const reservations = this.state.reservations;
        return (
            <div>
                <h1>Hi {this.state.currentUser?.name}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {reservations &&
                    <ul>
                        {reservations.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { ReservationPage };
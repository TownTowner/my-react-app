import React from 'react';

import { authServiceInstance, IUser, reservationServiceInstance } from '../services';

class ReservationPage extends React.Component<any, { currentUser: IUser, reservations: any[] }> {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: authServiceInstance.currentUserValue,
            reservations: null
        };
    }

    componentDidMount() {
        reservationServiceInstance.getAll().then(reservations => this.setState({ reservations }));
        console.log('ReservationPage didmount');
    }

    render() {
        const reservations = this.state.reservations;
        return (
            <div>
                <h1>Hi {this.state.currentUser?.name}!</h1>
                <h3>Here are your reservations:</h3>
                {reservations &&
                    <ul>
                        {reservations.map(r =>
                            <li key={r.id}>{r.guestId}-{r.tableId}-{r.reservationTime}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { ReservationPage };
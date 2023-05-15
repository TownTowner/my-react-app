import React from 'react';

import { authServiceInstance, IUser, reservationServiceInstance } from '../services';
import ImgMediaCard from '../utils/ImgMediaCard';

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
                {!reservations && <h3>No andy reservations here.</h3>}
                {reservations &&
                    reservations.map(r =>
                        // <li key={r.id}>{r.guestId}-{r.tableId}-{r.reservationTime}</li>
                        <ImgMediaCard key={r.id} />
                    )
                }
            </div>
        );
    }
}

export { ReservationPage };
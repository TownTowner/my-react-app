// import config from 'configData';
import { Reservation } from '../models/ReservisionModel';
import { httpServiceInstance } from './HttpService';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class ReservationService {

    getAll(): Promise<Reservation[]> {
        // return httpServiceInstance.get(`${(config as any).apiUrl}/User/Reservations`);
        return httpServiceInstance.get(`${SERVER_URL}/User/Reservations`).then(res => res.data);
    }

}

export { ReservationService };
export const reservationServiceInstance = new ReservationService();
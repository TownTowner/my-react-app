// import config from 'configData';
import { httpServiceInstance } from './HttpService';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class ReservationService {

    getAll() {
        // return httpServiceInstance.get(`${(config as any).apiUrl}/User/Reservations`);
        return httpServiceInstance.get(`${SERVER_URL}/User/Reservations`);
    }

}

export { ReservationService };
export const reservationServiceInstance = new ReservationService();
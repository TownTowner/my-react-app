import config from 'config';
import { httpServiceInstance } from './HttpService';

class ReservationService {

    getAll() {
        return httpServiceInstance.get(`${(config as any).apiUrl}/User/Reservations`);
    }

}

export { ReservationService };
export const reservationServiceInstance = new ReservationService();
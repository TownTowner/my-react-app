import { IUser } from "../services";

interface Reservation {
    id: number,
    createdTime: Date,
    guest: IUser,
    table: Table,
    reservationTime: Date,
    reservationStatus: ReservationStatus
}
interface Table {
    size: number
}
enum ReservationStatus {
    /**未处理 */
    UnHandled = 0,
    /**已完成 */
    Completed = 1,
    /**取消 */
    Canceled = 2
}

export { ReservationStatus };
export type { Reservation, Table };

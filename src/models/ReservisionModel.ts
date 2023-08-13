import { IUser } from "../services";

interface Reservation {
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
    /// <summary>
    /// 未处理
    /// </summary>
    UnHandled = 0,
    /// <summary>
    /// 已完成
    /// </summary>
    Completed = 1,
    /// <summary>
    /// 取消
    /// </summary>
    Canceled = 2
}

export { ReservationStatus };
export type { Reservation, Table };

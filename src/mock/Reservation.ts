import Mock from 'mockjs';
import { ReservationStatus } from '../models/ReservisionModel';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

//get请求 
export default Mock.mock(/api\/User\/Reservations/, 'get', (options) => {
    let now = new Date();
    const ret = Mock.mock([{
        createdTime: now, guest: { name: 'admin', id: 1 },
        table: { size: 4, name: 'table1' },
        reservationTime: addDaysToDate(now, 2),
        reservationStatus: ReservationStatus.UnHandled
    }]);
    return { success: true, message: 'success', data: ret };
});

function addDaysToDate(date, days) {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
}
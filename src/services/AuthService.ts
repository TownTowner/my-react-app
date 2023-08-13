import { BehaviorSubject } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/ResponseModel';
// import config from 'configData';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));

export enum UserType {
    /**
     * 客人
     */
    Guest = 0,
    /**
     * 管理员
     */
    Employee = 1
}

export interface IUser {
    id?: number,
    token?: string,
    name?: string,
    code?: string,
    email?: string,
    userType?: UserType
}

class AuthService {
    get currentUser() { return currentUserSubject.asObservable() };
    get currentUserValue() { return currentUserSubject.value };

    login(email: string, password: string) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json,text/plain,*/*'
            },
            body: JSON.stringify({ email, password })
        };

        // ?old return fetch(`${(config as any).apiUrl}/Account/Login`, requestOptions)
        // return fetch(`${SERVER_URL}/Account/Login`, requestOptions)//fetch
        return axios(`${SERVER_URL}/Account/Login`, requestOptions)
            // .then((res) => this.handleResponse(res)) //fetch handl
            .then((res) => this.handleResponseAxios(res))
            .then((user: IUser) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next({ token: user.token });
                return user;
            });
    }

    register(email: string, password: string) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json,text/plain,*/*'
            },
            body: JSON.stringify({ email, password })
        };

        // return fetch(`${(config as any).apiUrl}/Account/Register`, requestOptions)
        // return fetch(`${SERVER_URL}/Account/Register`, requestOptions)
        return axios(`${SERVER_URL}/Account/Register`, requestOptions)
            //.then((res)=>this.handleResponse(res))//fetch handle
            .then(res => this.handleResponseAxios(res))// axios handle
            .then(user => {
                currentUserSubject.next({ token: user.token });
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        currentUserSubject.next(null);
    }

    authHeader() {
        // return authorization header with jwt token
        const currentUser = this.currentUserValue;
        if (currentUser && currentUser.token) {
            return { Authorization: `Bearer ${currentUser.token}` };
        } else {
            return {};
        }
    }

    handleResponseAxios(response: AxiosResponse<any, any>): Promise<AuthResponse> {
        if (response.status !== 200) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.logout();
                window.location.reload();
            }

            const error = response.request?.responseText || response.statusText;
            return Promise.reject({ success: false, message: 'error', errors: [error] });
        }

        return Promise.resolve(response.data);
    }

    handleResponse(response: any) {
        return response.text().then((text: any) => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    this.logout();
                    window.location.reload();
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }

}

export { AuthService };
export const authServiceInstance = new AuthService();
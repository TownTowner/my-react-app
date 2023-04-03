import { BehaviorSubject } from 'rxjs';
import config from 'config';

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
    id: number,
    token: string,
    name: string,
    code: string,
    email: string,
    userType: UserType
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

        return Promise.resolve({ email: 'fff', token: 'fff' })
            // return fetch(`${(config as any).apiUrl}/Account/Login`, requestOptions)
            //     .then(this.handleResponse)
            .then((user: IUser) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log('login', this.currentUserValue);
                currentUserSubject.next(user);
                console.log('login', this.currentUserValue);

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

        return fetch(`${(config as any).apiUrl}/Account/Register`, requestOptions)
            .then(this.handleResponse)
            .then(user => {
                currentUserSubject.next(user);
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
import { authServiceInstance } from "./AuthService";

class HttpService {

    post(url: string, header?: any): Promise<any> {
        return this.hfetch(url, 'POST', header);
    }

    get(url: string, header?: any): Promise<any> {
        return this.hfetch(url, 'GET', header);
    }

    hfetch(url: string, method: string, header?: any): Promise<any> {
        let authHeader = authServiceInstance.authHeader();
        let requestOptions = Object.assign({
            method: method,
            headers: Object.assign(authHeader, {
                'Content-Type': 'application/json',
                'Accept': 'application/json,text/plain,*/*'
            })
        }, header);

        return fetch(url, requestOptions).then((res) => this.handleResponse(res));
    }

    handleResponse(response: any) {
        return response.text().then((text: any) => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    authServiceInstance.logout();
                    window.location.reload();
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }
}

export { HttpService };
export const httpServiceInstance = new HttpService();
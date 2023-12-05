import axios, { AxiosResponse } from "axios";
import { authServiceInstance } from "./AuthService";
import { CommonResponse } from "../models/ResponseModel";

class HttpService {

    constructor() {
        axios.interceptors.request.use(config => {
            let auth = authServiceInstance.authHeader().Authorization;
            if (auth)
                config.headers.Authorization = auth;
            return config;
        });
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            return Promise.reject(error);
        });
    }

    post(url: string, header?: any): Promise<any> {
        return this.hfetch(url, 'POST', header);
    }

    get(url: string, header?: any): Promise<any> {
        return this.hfetch(url, 'GET', header);
    }

    hfetch(url: string, method: string, header?: any): Promise<any> {
        let requestOptions = Object.assign({
            method: method,
            headers: Object.assign({}, {
                'Content-Type': 'application/json',
                'Accept': 'application/json,text/plain,*/*'
            })
        }, header);

        return axios(url, requestOptions)
            // .then((res) => this.handleResponse(res))//fetch
            .then((res) => this.handleResponseAxios(res))//axios
            ;
    }

    handleResponseAxios(response: AxiosResponse<any, any>): Promise<CommonResponse> {
        if (response.status !== 200) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authServiceInstance.logout();
                window.location.reload();
            }

            const error = response.request?.responseText || response.statusText;
            return Promise.reject(error);
        }

        return Promise.resolve(response.data);
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
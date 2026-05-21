import { Injectable } from "@angular/core";
import axios, { AxiosInstance } from "axios";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../environments/environment";
import { MessageService } from "./message.service";

@Injectable({ providedIn: 'root' })
export class HttpService {
    private api: AxiosInstance;

    constructor(
        private cookie: CookieService,
        private messageService: MessageService
    ){
        this.api = axios.create();

        this.setupInterceptors();
    }
    
    private setupInterceptors() {
        this.api.interceptors.request.use((config) => {
            const token = this.cookie.get(environment.token_cookie_key);

            if (token) {
                config.headers = config.headers;
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });

        this.api.interceptors.response.use(response => response, error => {
            if (error.response) {
                this.messageService.showError(error.response.data.message);
            }

            return Promise.reject(error);
        });
    }

    get<T>(url: string, config?: any) {
        return this.api.get<T>(url, config);
    }

    post<T>(url: string, data?: any, config?: any) {
        return this.api.post<T>(url, data, config);
    }

    put<T>(url: string, data?: any, config = {}) {
        return this.api.put<T>(url, data, config);
    }

    delete<T>(url: string, config = {}) {
        return this.api.delete<T>(url, config);
    }
}
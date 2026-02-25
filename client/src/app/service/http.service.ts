import { Injectable } from "@angular/core";
import axios, { AxiosInstance } from "axios";

@Injectable({ providedIn: 'root' })
export class HttpService {
    private api: AxiosInstance;

    constructor(
    ){
        this.api = axios.create()
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
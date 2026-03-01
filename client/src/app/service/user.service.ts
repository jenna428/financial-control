import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserRegisterDto } from "../dto/user-register.dto";
import { HttpService } from "./http.service";
import { environment } from "../../environments/environment";
import { LoginDto } from "../dto/login.dto";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class UserService{

    private readonly baseUrl = environment.api_url + 'user';

    constructor(
        private router: Router,
        private readonly http: HttpService,
        private cookieService: CookieService
    ){}

    async save(useDto: UserRegisterDto, password: String){
        if (useDto.password == password){
            await this.http.post(this.baseUrl, useDto)
            this.router.navigate(['/login'])
        }
    }

    async login(loginDto: LoginDto){
        const token = (await this.http.post<string>(this.baseUrl + '/login', loginDto)).data;

        this.cookieService.set(environment.token_cookie_key, token);
    }

    logout(){
        this.cookieService.delete(environment.token_cookie_key);
    }
}
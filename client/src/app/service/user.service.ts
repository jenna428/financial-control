import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserRegisterDto } from "../dto/user-register.dto";
import { HttpService } from "./http.service";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(
        private router: Router,
        private readonly http: HttpService
    ){}

    async save(useDto: UserRegisterDto, password: String){
        if (useDto.password == password){
            await this.http.post(environment.api_url + 'user', useDto)
            this.router.navigate(['/login'])
        }
    }
}
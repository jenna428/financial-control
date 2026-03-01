import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ){}

    createToken(userId: number): string { //payload é um objeto que sera trasformado em um hash(token)
        const payload = {
            id: userId
        }

        const token = this.jwtService.sign(payload); // transforma o payload em token

        return token;
    }
}
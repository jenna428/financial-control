import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import type { LoginDto } from "src/dto/login.dto";
import type { UserDto } from "src/dto/user.dto";
import { JwtGuard } from "src/guards/jwt.guard";
import { UserService } from "src/services/user.service";

@Controller('api/user')
export class UserController{
    constructor(
        private readonly userService: UserService
    ){}
    
    @Post()
    async save(@Body() userDto: UserDto){
        await this.userService.create(userDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<string> {
       return await this.userService.login(loginDto)
    }
}
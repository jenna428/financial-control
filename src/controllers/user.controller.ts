import { Body, Controller, Post } from "@nestjs/common";
import type { UserDto } from "src/dto/user.dto";
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
}
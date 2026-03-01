import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { env } from "process";
import { UserController } from "src/controllers/user.controller";
import { UserEntity } from "src/entity/user.entity";
import { UserRepository } from "src/repository/user.repository";
import { AuthService } from "src/services/auth.service";
import { UserService } from "src/services/user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: env.JWT_SECRET
        }),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository, AuthService]
})
export class UserModule{}
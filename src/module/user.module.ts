import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/controllers/user.controller";
import { UserEntity } from "src/entity/user.entity";
import { UserRepository } from "src/repository/user.repository";
import { UserService } from "src/services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, UserRepository]
})
export class UserModule{}
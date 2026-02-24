import { UserDto } from "src/dto/user.dto";
import { UserEntity } from "src/entity/user.entity";

export class UserMapper{

    static toDto(userEntity: UserEntity): UserDto {
        const userDto: UserDto = {
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email,
            password: userEntity.password
        }

        return userDto
    }

    static toEntity(userDto: UserDto): UserEntity {
        const userEntity: UserEntity = {
            id: userDto.id,
            name: userDto.name,
            email: userDto.email,
            password: userDto.password
        }
        return userEntity
    }
}
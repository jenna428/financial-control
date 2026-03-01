import { Body, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { UserMapper } from "src/mapper/user.mapper";
import { UserRepository } from "src/repository/user.repository";
import * as bcrypt from 'bcrypt';
import { GeralConfig } from "src/config/geral.config";
import { LoginDto } from "src/dto/login.dto";
import { UserDto } from "src/dto/user.dto";
import { AuthService } from "./auth.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService
    ){}

    async create(userDto: UserDto){
        const hashPassword = await bcrypt.hash(userDto.password, GeralConfig.SALTROUND)

        const user: UserEntity = {
            id: userDto.id,
            name: userDto.name,
            email: userDto.email,
            password: hashPassword
        }

        await this.userRepository.save(user);
    }

    async login(login: LoginDto): Promise<string> {
        const user = await this.userRepository.findOne({
            where: {name: login.username}
        });

        if(!user){
            throw new HttpException('Usuário ou senha incorretos!', HttpStatus.NOT_FOUND)
        }

        const hash = await bcrypt.hash(login.password, GeralConfig.SALTROUND);
        
        const isLogged = bcrypt.compare(hash, user.password);

        if(!isLogged){
            throw new HttpException('Usuário ou senha incorretos!', HttpStatus.NOT_FOUND)
        }

        return this.authService.createToken(user.id);
    }

    async delete(userId: number){
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })

        if(!user){
            throw new HttpException('Usuário não Encontrado!', HttpStatus.NOT_FOUND)
        }
        this.userRepository.delete(userId)
    }

    async update( userDto: UserDto){//, userId: number <- precisa pegar/passar como parametro o id do usuario da requisição
        const user = await this.userRepository.findOne({
            where: {
                id: userDto.id
            }
        })

        if(!user){
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)
        }

        const hash = await bcrypt.hash(userDto.password, GeralConfig.SALTROUND)

        user.name = userDto.name,
        user.email = userDto.email,
        user.password = hash

        await this.userRepository.save(user)
    }
    
}

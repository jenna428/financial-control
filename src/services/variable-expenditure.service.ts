import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VariableExpenditureDto } from "src/dto/variable-expenditure.dto";
import { VariableExpenditureEntity } from "src/entity/variable-expenditure.entity";
import { VariableExpenditureMapper } from "src/mapper/variable-expenditure.mapper";
import { VariableExpenditureRepository } from "src/repository/variable-expenditure.repository";

@Injectable()
export class VariableExpenditureService{

    constructor(
        @InjectRepository(VariableExpenditureEntity)
        private readonly variableExpenditureRepository: VariableExpenditureRepository,
    )
    {}

    async create(variableExpenditureDto: VariableExpenditureDto,  userId: number){
        await this.variableExpenditureRepository.save(VariableExpenditureMapper.toEntity(variableExpenditureDto, userId));
    }

    async findAll(): Promise<VariableExpenditureDto[]>{
        const variableExpenditures = await this.variableExpenditureRepository.find();

        const variableExpendituresDto: VariableExpenditureDto[] = variableExpenditures.map(VariableExpenditureMapper.toDto);

        return variableExpendituresDto;
    }

    async delete(variableExpenditureId: number){ //, userId: number <- precisa pegar/passar como parametro o id do usuario da requisição
        const transType = await this.variableExpenditureRepository.findOne({
            relations: ['user'],
            where: {
                id: variableExpenditureId
            }
        })

        if (!transType) {
            throw new HttpException('Tipo de Transação não encontrada!', HttpStatus.NOT_FOUND)
        }
        
        await this.variableExpenditureRepository.delete(variableExpenditureId);
    }

    async update(variableExpenditureDto: VariableExpenditureDto, userId: number){ //, userId: number <- precisa pegar/passar como parametro o id do usuario da requisição
        const transType = await this.variableExpenditureRepository.findOne({
            relations: ['user'],
            where: {
                id: variableExpenditureDto.id,
                // user: {
                //     id: userId
                // }
            }
        })

        if (!transType) {
            throw new HttpException('Tipo de Transação não encontrada!', HttpStatus.NOT_FOUND)
        }

        if (transType.user?.id !== userId ) {
            throw new HttpException('Requisição não autorizada!', HttpStatus.UNAUTHORIZED) 
        }

        transType.name = variableExpenditureDto.name;
        transType.isActive = variableExpenditureDto.isActive;

        await this.variableExpenditureRepository.save(transType);
    }

}
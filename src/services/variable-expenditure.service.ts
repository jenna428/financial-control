import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VariableExpenditureDto } from "src/dto/variable-expenditure.dto";
import { VariableExpenditureEntity } from "src/entity/variable-expenditure.entity";
import { VariableExpenditureMapper } from "src/mapper/variable-expenditure.mapper";
import { VariableExpenditureRepository } from "src/repository/variable-expenditure.repository";
import { FindManyOptions } from "typeorm";

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

    async findAll(userId:number): Promise<VariableExpenditureDto[]>{
        const option: FindManyOptions = {
            where: {
                userId: userId,
                isActive: true
            }
        }
        const variableExpenditures = await this.variableExpenditureRepository.find(option);

        const variableExpendituresDto: VariableExpenditureDto[] = variableExpenditures.map(VariableExpenditureMapper.toDto);

        return variableExpendituresDto;
    }

    async findDisabledTransactions( userId: number ): Promise<VariableExpenditureDto[]>{
            const option: FindManyOptions = {
                where: {
                    isActive: false,
                    userId: userId
                }
            }
            const transactions = await this.variableExpenditureRepository.find(option);
    
            const transactionsDto: VariableExpenditureDto[] = transactions.map(VariableExpenditureMapper.toDto);
            return transactionsDto;
        }

    async delete(variableExpenditureId: number, userId: number){ //, userId: number <- precisa pegar/passar como parametro o id do usuario da requisição
        const transType = await this.variableExpenditureRepository.findOne({
            relations: ['user'],
            where: {
                id: variableExpenditureId,
                userId: userId
            }
        })

        if (!transType) {
            throw new HttpException('Tipo de Transação não encontrada!', HttpStatus.NOT_FOUND)
        }
        
        await this.variableExpenditureRepository.delete(variableExpenditureId);
    }

    async isActive(transId: number, userId: number){
        const trans = await this.variableExpenditureRepository.findOne({
            relations: ['user'],
            where: {
                id: transId,
            }
        })

        if (!trans) {
            throw new HttpException('Tipo de Transação não encontrada!', HttpStatus.NOT_FOUND)
        }

        if (trans.user?.id !== userId ) {
            throw new HttpException('Requisição não autorizada!', HttpStatus.UNAUTHORIZED)    
        }

        trans.isActive = !trans.isActive;

        await this.variableExpenditureRepository.save(trans);
    }

    async update(variableExpenditureDto: VariableExpenditureDto, userId: number){ //, userId: number <- precisa pegar/passar como parametro o id do usuario da requisição
        const transType = await this.variableExpenditureRepository.findOne({
            where: {
                id: variableExpenditureDto.id
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
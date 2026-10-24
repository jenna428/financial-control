import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginatorRequest, PaginatorResponse } from "src/dto/paginator.dto";
import { VariableExpenditureDto } from "src/dto/variable-expenditure.dto";
import { VariableExpenditureEntity } from "src/entity/variable-expenditure.entity";
import { VariableExpenditureMapper } from "src/mapper/variable-expenditure.mapper";
import { VariableExpenditureRepository } from "src/repository/variable-expenditure.repository";
import { Between, FindManyOptions, In } from "typeorm";

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
            }
        }
        const variableExpenditures = await this.variableExpenditureRepository.find(option);

        const variableExpendituresDto: VariableExpenditureDto[] = variableExpenditures.map(VariableExpenditureMapper.toDto);

        return variableExpendituresDto;
    }

    async findToPaginator(pag: PaginatorRequest, userId:number): Promise<PaginatorResponse<VariableExpenditureDto>>{
        const option: FindManyOptions = {
            where: {
                userId: userId,
            },
            skip: pag.pageIndex * pag.pageSize,
            take: pag.pageSize
        }
        const [transactions, length ] = await this.variableExpenditureRepository.findAndCount(option);
        
        const transactionsDto: VariableExpenditureDto[] = transactions.map(VariableExpenditureMapper.toDto);

        return {
            data: transactionsDto,
            length: length
        };
    }

    async delete(variableTransactionIds: number[], userId: number){
    
            if (!variableTransactionIds) {
                throw new HttpException('Tipo de Transação não encontrada!', HttpStatus.NOT_FOUND)
            }
    
            await this.variableExpenditureRepository.delete({
                id: In(variableTransactionIds),
                userId: userId
            });
        }

    async update(variableExpenditureDto: VariableExpenditureDto, userId: number){
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

        await this.variableExpenditureRepository.save(transType);
    }

}
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionTypeDto } from "src/dto/transaction-type.dto";
import { TransactionTypeEntity } from "src/entity/transaction-type.entity";
import { TransactionTypeMapper } from "src/mapper/transaction-type.mapper";
import { TransactionTypeRepository } from "src/repository/transaction-type.repository";

@Injectable()
export class TransactionTypeService{

    constructor(
        @InjectRepository(TransactionTypeEntity)
        private readonly transactionTypeRepository: TransactionTypeRepository,
    )
    {}

    async create(transactionTypeDto: TransactionTypeDto){
        await this.transactionTypeRepository.save(TransactionTypeMapper.toEntity(transactionTypeDto));
    }

    async delete(transactionTypeId: number){
        // await this.checkUserHasPermissionInTrasactionType(transactionTypeId, userId);
        const transType = await this.transactionTypeRepository.findOne({
            relations: ['user'],
            where: {
                id: transactionTypeId
            }
        })

        if (!transType) {
            throw new HttpException('Tipo de Transação não encontrada!', HttpStatus.NOT_FOUND)
        }
        
        await this.transactionTypeRepository.delete(transactionTypeId);
    }

    async update(transactionTypeDto: TransactionTypeDto, userId: number){ //, userId: number <- precisa pegar/passar como parametro o id do usuario da requisição
        const transType = await this.transactionTypeRepository.findOne({
            relations: ['user'],
            where: {
                id: transactionTypeDto.id,
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

        transType.name = transactionTypeDto.name;
        transType.isFixed = transactionTypeDto.isFixed;
        transType.type = transactionTypeDto.type;

        await this.transactionTypeRepository.save(transType);
    }

    /*private async checkUserHasPermissionInTrasactionType(transactionTypeId: number, userId: number) {
        const transType = await this.transactionTypeRepository.findOne({
            relations: ['user'],
            where: {
                id: transactionTypeId
            }
        })

        if (!transType) {
            // throw execption('tipo de transaçao nao encontrada');
        }

        if (transType?.user?.id !== userId ) {
            // throw execption('Voce nao tem permissao para alterar essa transiçao');
        }
    }*/
}
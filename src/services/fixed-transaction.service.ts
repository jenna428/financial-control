import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FixedTransactionDto } from "src/dto/fixed-transaction.dto";
import { FixedTransactionEntity } from "src/entity/fixed-transaction.entity";
import { FixedTransactionMapper } from "src/mapper/fixed-transaction.mapper";
import { FixedTransactionRepository } from "src/repository/fixed-transaction.repository";

@Injectable()
export class FixedTransactionService{

    constructor(
        @InjectRepository(FixedTransactionEntity)
        private readonly fixedTransactionRepository: FixedTransactionRepository,
    )
    {}

    async create(fixedTransactionDto: FixedTransactionDto){
        await this.fixedTransactionRepository.save(FixedTransactionMapper.toEntity(fixedTransactionDto));
    }

    async delete(fixedTransactionId: number){
        // await this.checkUserHasPermissionInTrasactionType(fixedTransactionId, userId);
        const transType = await this.fixedTransactionRepository.findOne({
            relations: ['user'],
            where: {
                id: fixedTransactionId
            }
        })

        if (!transType) {
            throw new HttpException('Tipo de Transação não encontrada!', HttpStatus.NOT_FOUND)
        }
        
        await this.fixedTransactionRepository.delete(fixedTransactionId);
    }

    async update(fixedTransactionDto: FixedTransactionDto, userId: number){ //, userId: number <- precisa pegar/passar como parametro o id do usuario da requisição
        const transType = await this.fixedTransactionRepository.findOne({
            relations: ['user'],
            where: {
                id: fixedTransactionDto.id,
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

        transType.name = fixedTransactionDto.name;
        transType.isActive = fixedTransactionDto.isActive;
        transType.category = fixedTransactionDto.category;

        await this.fixedTransactionRepository.save(transType);
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
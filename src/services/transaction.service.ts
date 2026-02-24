import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionDto } from "src/dto/transaction.dto";
import { TransactionEntity } from "src/entity/transaction.entity";
import { TransactionMapper } from "src/mapper/transaction.mapper";
import { TransactionRepository } from "src/repository/transaction.repository";

@Injectable()
export class TransactionService{
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: TransactionRepository
    ){}

    async create(transactionDto: TransactionDto){
        await this.transactionRepository.save(TransactionMapper.toEntity(transactionDto))
    }

    async delete(transactionId: number){
        await this.transactionRepository.delete(transactionId)
    }

    async update(transactionDto: TransactionDto){ //, userId: number <- precisa pegar/passar como parametro o id do usuario da requisição
            const transaction = await this.transactionRepository.findOne({
                relations: ['user'],
                where: {
                    id: transactionDto.id
                }
            })
    
            /*if (!transaction) {
                // throw execption('tipo de transaçao nao encontrada');
            }
    
            if (transaction?.user?.id !== userId ) {
                // throw execption('Voce nao tem permissao para alterar essa transiçao');
            }*/
    
            transaction.amount = transactionDto.amount,
            transaction.description = transactionDto.description,
            transaction.transactionType = transactionDto.transactionType,
            transaction.transactionDate = transactionDto.transactionDate

    
            await this.transactionRepository.save(transaction);
        }

}
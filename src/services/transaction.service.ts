import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
        const transaction = await this.transactionRepository.findOne({
            relations: ['user'],
            where: {
                id: transactionId
            }
        })

        if (!transaction){
            throw new HttpException('Transação não encontrada', HttpStatus.NOT_FOUND)
        }

        await this.transactionRepository.delete(transactionId)
    }

    async update(transactionDto: TransactionDto){ //, userId: number <- precisa pegar/passar como parametro o id do usuario da requisição
            const transaction = await this.transactionRepository.findOne({
                relations: ['user'],
                where: {
                    id: transactionDto.id
                }
            })

            if(!transaction){
                throw new HttpException('Transação não encontrada!', HttpStatus.NOT_FOUND)
            }
    
            /*if (transaction?.user?.id !== userId ) {
                // throw execption('Voce nao tem permissao para alterar essa transiçao');
            }*/
    
            transaction.amount = transactionDto.amount,
            transaction.description = transactionDto.description,
            transaction.transactionDate = transactionDto.transactionDate

    
            await this.transactionRepository.save(transaction);
        }

}
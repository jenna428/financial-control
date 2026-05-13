import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionDto } from "src/dto/transaction.dto";
import { TransactionEntity } from "src/entity/transaction.entity";
import { TransactionMapper } from "src/mapper/transaction.mapper";
import { TransactionRepository } from "src/repository/transaction.repository";
import { Transaction2Repository } from "src/repository/transaction2.repository";

@Injectable()
export class TransactionService{
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: TransactionRepository,
        private transactio2nRepository: Transaction2Repository,
    ){}

    async create(transactionDto: TransactionDto, userId: number){
        await this.transactionRepository.save(TransactionMapper.toEntity(transactionDto, userId))
    }

    async delete(transactionId: number, userId: number){
        const transaction = await this.transactionRepository.findOne({
            relations: ['user'],
            where: {
                id: transactionId,
                userId: userId
            }
        });

        if (!transaction){
            throw new HttpException('Transação não encontrada', HttpStatus.NOT_FOUND)
        }

        await this.transactionRepository.delete(transactionId)
    }

    async update(transactionDto: TransactionDto, userId: number){
        const transaction = await this.transactionRepository.findOne({
            where: {
                id: transactionDto.id,
                userId: userId
            }
        })

        if(!transaction){
            throw new HttpException('Transação não encontrada!', HttpStatus.NOT_FOUND)
        }

        transaction.amount = transactionDto.amount,
        transaction.description = transactionDto.description,
        transaction.expenditureId = transactionDto.expenditure.id
        transaction.transactionDate = transactionDto.transDate


        await this.transactionRepository.save(transaction);
    }

    async findAllByUserId(userId: number): Promise<TransactionDto[]>{
        const transactions = await this.transactionRepository.find({
            relations: ['expenditure'],
            where: {
                userId: userId
            }
        });

        // const transactions = await this.transactio2nRepository.getTransactionsByUserId(userId);

        const transactionsDto: TransactionDto[] = transactions.map(TransactionMapper.toDto);

        return transactionsDto;
    }

}
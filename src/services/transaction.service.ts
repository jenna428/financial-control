import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginatorRequest, PaginatorResponse } from "src/dto/paginator.dto";
import { TransactionDto } from "src/dto/transaction.dto";
import { TransactionEntity } from "src/entity/transaction.entity";
import { TransactionMapper } from "src/mapper/transaction.mapper";
import { TransactionRepository } from "src/repository/transaction.repository";
import { Transaction2Repository } from "src/repository/transaction2.repository";
import { Between, FindManyOptions, In } from "typeorm";

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

    async delete(transactionIds: number[], userId: number){
        if (!transactionIds) {
            throw new HttpException('Tipo de Transação não encontrada!', HttpStatus.NOT_FOUND)
        }

        await this.transactionRepository.delete({
            id: In(transactionIds),
            userId: userId
        });
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

    async findAllByUserId(pag: PaginatorRequest, userId: number): Promise<PaginatorResponse<TransactionDto>>{
        const option: FindManyOptions = {
            relations: ['expenditure'],
            where: {
                userId: userId,
            },
            skip: pag.pageIndex * pag.pageSize,
            take: pag.pageSize
        }
        const [transactions, length ] = await this.transactionRepository.findAndCount(option);

        const transactionsDto: TransactionDto[] = transactions.map(TransactionMapper.toDto);

        return {
            data: transactionsDto,
            length: length
        };
    }

    async findAllByUserIdAndPeriod(userId: number, beginDate: Date, endDate: Date): Promise<TransactionEntity[]>{
        return await this.transactionRepository.find({
            relations: ['expenditure'],
            where: {
                userId: userId,
                transactionDate: Between(beginDate, endDate)
            }
        });
    }
}
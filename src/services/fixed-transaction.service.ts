import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FixedTransactionDto } from "src/dto/fixed-transaction.dto";
import { FixedTransactionEntity } from "src/entity/fixed-transaction.entity";
import { Category } from "src/enums/enums";
import { FixedTransactionMapper } from "src/mapper/fixed-transaction.mapper";
import { FixedTransactionRepository } from "src/repository/fixed-transaction.repository";
import { FindManyOptions } from "typeorm";

@Injectable()
export class FixedTransactionService{

    constructor(
        @InjectRepository(FixedTransactionEntity)
        private readonly fixedTransactionRepository: FixedTransactionRepository,
    )
    {}

    async create(fixedTransactionDto: FixedTransactionDto, userId: number){
        const trans = FixedTransactionMapper.toEntity(fixedTransactionDto, userId);
        await this.fixedTransactionRepository.save(trans);
        
    }

    async delete(fixedTransactionId: number, userId: number){
        // await this.checkUserHasPermissionInTrasactionType(fixedTransactionId, userId);
        const transType = await this.fixedTransactionRepository.findOne({
            relations: ['user'],
            where: {
                id: fixedTransactionId,
                userId: userId
            }
        })

        if (!transType) {
            throw new HttpException('Tipo de Transação não encontrada!', HttpStatus.NOT_FOUND)
        }
        
        await this.fixedTransactionRepository.delete(fixedTransactionId);
    }

    async findOneById(fixedTransactionId: number): Promise<FixedTransactionDto> {
        const fixedTransaction = await this.fixedTransactionRepository.findOne({
            where: {id: fixedTransactionId}
        })
    
        return FixedTransactionMapper.toDto(fixedTransaction); 
    }

    async update(fixedTransactionDto: FixedTransactionDto, userId: number){
        const transType = await this.fixedTransactionRepository.findOne({
            relations: ['user'],
            where: {
                id: fixedTransactionDto.id,
            }
        })

        if (!transType) {
            throw new HttpException('Tipo de Transação não encontrada!', HttpStatus.NOT_FOUND)
        }

        if (transType.user?.id !== userId ) {
            throw new HttpException('Requisição não autorizada!', HttpStatus.UNAUTHORIZED)    
        }

        transType.name = fixedTransactionDto.name;
        transType.amount = fixedTransactionDto.amount,
        transType.isActive = fixedTransactionDto.isActive;
        transType.category = fixedTransactionDto.category;

        await this.fixedTransactionRepository.save(transType);
    }

    async isActive(transId: number, userId: number){
        const trans = await this.fixedTransactionRepository.findOne({
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

        await this.fixedTransactionRepository.save(trans);
    }

   async findByCategory(category: Category, userId: number): Promise<FixedTransactionDto[]>{
        const option: FindManyOptions = {
            where: {
                category: category,
                userId: userId,
                isActive: true
            }
        }
        const transactions = await this.fixedTransactionRepository.find(option);

        const transactionsDto: FixedTransactionDto[] = transactions.map(FixedTransactionMapper.toDto);
        return transactionsDto;
    }

    async findDisabledTransactions( userId: number ): Promise<FixedTransactionDto[]>{
        const option: FindManyOptions = {
            where: {
                isActive: false,
                userId: userId
            }
        }
        const transactions = await this.fixedTransactionRepository.find(option);

        const transactionsDto: FixedTransactionDto[] = transactions.map(FixedTransactionMapper.toDto);
        return transactionsDto;
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
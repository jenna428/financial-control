import { TransactionDto } from "src/dto/transaction.dto";
import { TransactionEntity } from "src/entity/transaction.entity";
import { VariableExpenditureMapper } from "./variable-expenditure.mapper";

export class TransactionMapper {
    static toDto(transactionEntity: TransactionEntity): TransactionDto {
        const transactionDto: TransactionDto = {
            id: transactionEntity.id,
            expenditure: VariableExpenditureMapper.toDto(transactionEntity.expenditure),
            amount: transactionEntity.amount,
            description: transactionEntity.description,
            transDate: transactionEntity.transactionDate
        }
        return transactionDto
    }

    static toEntity(transactionDto: TransactionDto, userId: number): TransactionEntity {
        const transactionEntity: TransactionEntity ={
            id: transactionDto.id,
            userId: userId,
            expenditureId: transactionDto.expenditure.id,
            amount: transactionDto.amount,
            description: transactionDto.description,
            transactionDate: transactionDto.transDate
        }
        return transactionEntity;
    }
}
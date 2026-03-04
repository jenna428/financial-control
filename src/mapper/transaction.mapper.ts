import { TransactionDto } from "src/dto/transaction.dto";
import { TransactionEntity } from "src/entity/transaction.entity";

export class TransactionMapper {
    static toDto(transactionEntity: TransactionEntity): TransactionDto {
        const transactionDto: TransactionDto = {
            id: transactionEntity.id,
            user: transactionEntity.user,
            expenditure: transactionEntity.expenditure,
            amount: transactionEntity.amount,
            description: transactionEntity.description,
            transactionDate: transactionEntity.transactionDate
        }
        return transactionDto
    }

    static toEntity(transactionDto: TransactionDto): TransactionEntity {
        const transactionEntity: TransactionEntity ={
            id: transactionDto.id,
            user: transactionDto.user,
            expenditure: transactionDto.expenditure,
            amount: transactionDto.amount,
            description: transactionDto.description,
            transactionDate: transactionDto.transactionDate
        }
        return transactionEntity;
    }
}
import { TransactionDto } from "src/dto/transaction.dto";
import { TransactionEntity } from "src/entity/transaction.entity";

export class TransactionMapper {
    static toDto(transactionEntity: TransactionEntity): TransactionDto {
        const transactionDto: TransactionDto = {
            user: transactionEntity.user,
            transactionType: transactionEntity.transactionType,
            amount: transactionEntity.amount,
            description: transactionEntity.description,
            transactionDate: transactionEntity.transactionDate
        }
        return transactionDto
    }

    static toEntity(transactionDto: TransactionDto): TransactionEntity {
        const transactionEntity: TransactionEntity ={
            user: transactionDto.user,
            transactionType: transactionDto.transactionType,
            amount: transactionDto.amount,
            description: transactionDto.description,
            transactionDate: transactionDto.transactionDate
        }
        return transactionEntity;
    }
}
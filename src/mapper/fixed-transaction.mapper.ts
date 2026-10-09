import { FixedTransactionDto} from "src/dto/fixed-transaction.dto";
import { FixedTransactionEntity} from "src/entity/fixed-transaction.entity";


export class FixedTransactionMapper{
    static toDto(fixedTransactionEntity: FixedTransactionEntity): FixedTransactionDto{
        const fixedTransactionDto: FixedTransactionDto = {
            id: fixedTransactionEntity.id,
            name: fixedTransactionEntity.name,
            amount: fixedTransactionEntity.amount,
            category: fixedTransactionEntity.category,
            transactionDate: fixedTransactionEntity.transactionDate
        }
        return fixedTransactionDto;
    }

    static toEntity(fixedTransactionDto: FixedTransactionDto, userId: number) : FixedTransactionEntity {
        const fixedTransactionEntity: FixedTransactionEntity = {
            id: fixedTransactionDto.id ?? null,
            userId: userId,
            name: fixedTransactionDto.name,
            amount: fixedTransactionDto.amount,
            category: fixedTransactionDto.category,
            transactionDate: fixedTransactionDto.transactionDate
        }
        return fixedTransactionEntity
    }
}
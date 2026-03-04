import { FixedTransactionDto} from "src/dto/fixed-transaction.dto";
import { FixedTransactionEntity} from "src/entity/fixed-transaction.entity";


export class FixedTransactionMapper{
    static toDto(fixedTransactionEntity: FixedTransactionEntity): FixedTransactionDto{
        const fixedTransactionDto: FixedTransactionDto = {
            id: fixedTransactionEntity.id,
            user: fixedTransactionEntity.user,
            name: fixedTransactionEntity.name,
            category: fixedTransactionEntity.category,
            isActive: fixedTransactionEntity.isActive,
            transactionData: fixedTransactionEntity.transactionDate
        }
        return fixedTransactionDto;
    }

    static toEntity(fixedTransactionDto: FixedTransactionDto) : FixedTransactionEntity {
        const fixedTransactionEntity: FixedTransactionEntity = {
            id: fixedTransactionDto.id,
            user: fixedTransactionDto.user,
            name: fixedTransactionDto.name,
            category: fixedTransactionDto.category,
            isActive: fixedTransactionDto.isActive,
            transactionDate: fixedTransactionDto.transactionData
        }
        return fixedTransactionEntity
    }
}
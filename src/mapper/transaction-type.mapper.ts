import { TransactionTypeDto } from "src/dto/transaction-type.dto";
import { TransactionTypeEntity } from "src/entity/transaction-type.entity";


export class TransactionTypeMapper{
    static toDto(transactionTypeEntity: TransactionTypeEntity): TransactionTypeDto{
        const transactionTypeDto: TransactionTypeDto = {
            user: transactionTypeEntity.user,
            name: transactionTypeEntity.name,
            type: transactionTypeEntity.type,
            isFixed: transactionTypeEntity.isFixed
        }
        return transactionTypeDto;
    }

    static toEntity(transactionTypeDto: TransactionTypeDto) : TransactionTypeEntity {
        const transactionTypeEntity: TransactionTypeEntity = {
            user: transactionTypeDto.user,
            name: transactionTypeDto.name,
            type: transactionTypeDto.type,
            isFixed: transactionTypeDto.isFixed
        }
        return transactionTypeEntity
    }
}
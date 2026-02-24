import { TransactionTypeDto } from "src/dto/transaction-type.dto";
import { TransactionTypeEntity } from "src/entity/transaction-type.entity";


export class TransactionTypeMapper{
    static toDto(transactionTypeEntity: TransactionTypeEntity): TransactionTypeDto{
        const transactionTypeDto: TransactionTypeDto = {
            id: transactionTypeEntity.id,
            user: transactionTypeEntity.user,
            name: transactionTypeEntity.name,
            type: transactionTypeEntity.type,
            isFixed: transactionTypeEntity.isFixed
        }
        return transactionTypeDto;
    }

    static toEntity(transactionTypeDto: TransactionTypeDto) : TransactionTypeEntity {
        const transactionTypeEntity: TransactionTypeEntity = {
            id: transactionTypeDto.id,
            user: transactionTypeDto.user,
            name: transactionTypeDto.name,
            type: transactionTypeDto.type,
            isFixed: transactionTypeDto.isFixed
        }
        return transactionTypeEntity
    }
}
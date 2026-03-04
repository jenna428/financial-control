import { TransactionTypeDto } from "./transaction-type.dto"
import { UserDto } from "./user.dto"

export interface TransactionDto {
    id: number,
    user: UserDto,
    transactionType: TransactionTypeDto,
    amount: number,
    description: string,
    transactionDate: Date
}
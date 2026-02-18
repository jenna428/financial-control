import { TransactionTypeDto } from "./transaction-type.dto"
import { UserDto } from "./user.dto"

export interface TransactionDto {
    user: UserDto,
    transactionType: TransactionTypeDto,
    amount: number,
    description: String,
    transactionDate: Date
}
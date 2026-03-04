import { UserDto } from "./user.dto"

export interface TransactionDto {
    id: number,
    user: UserDto,
    amount: number,
    description: string,
    transactionDate: Date
}
import { UserDto } from "./user.dto"
import { VariableExpenditureDto } from "./variable-expenditure.dto"

export interface TransactionDto {
    id: number,
    user: UserDto,
    //expenditure: VariableExpenditureDto
    amount: number,
    description: string,
    transactionDate: Date
}
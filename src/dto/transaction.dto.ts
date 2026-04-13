import { VariableExpenditureDto } from "./variable-expenditure.dto"

export interface TransactionDto {
    id: number,
    expenditure: VariableExpenditureDto,
    amount: number,
    description: string,
    transDate: Date
}
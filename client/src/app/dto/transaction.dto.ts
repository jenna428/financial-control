import { VariableExpenditureDto } from "./variable-expenditure.dto";

export interface TransactionDto{
    id?: number,
    amount: number,
    transDate: Date,
    description: string,
    expenditure: VariableExpenditureDto
}
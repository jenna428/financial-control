import { Category } from "src/enums/enums";

export interface TransactionTableDto {
    name: string,
    category: Category,
    isFixed: boolean,
    amount?: number,
    transactionDate?: Date
}
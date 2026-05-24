import { Category } from "../classes/enums/enums";

export interface TransactionTableDto {
    name: string,
    id: number,
    category: Category,
    isFixed: boolean,
    amount: number,
    transactionDate: Date
}
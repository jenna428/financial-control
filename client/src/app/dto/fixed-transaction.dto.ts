import { Category } from "../classes/enums/enums";

export interface FixedTransactionDto{
    id?: number,
    name: string,
    amount: number,
    category: Category,
    isActive: boolean,
    transactionData: Date
}
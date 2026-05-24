import { Category } from "src/enums/enums";

export interface SummaryTransaction {
    amount: number;
    transactionDate: Date;
    category: Category;
}
import { Category } from "src/enums/enums";
import { UserDto } from "./user.dto";

export interface FixedTransactionDto{
    id: number,
    name: string,
    amount: number,
    category: Category,
    isActive: boolean,
    transactionDate: Date
}
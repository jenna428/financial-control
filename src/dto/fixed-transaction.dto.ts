import { Category } from "src/enums/enums";
import { UserDto } from "./user.dto";

export interface FixedTransactionDto{
    id: number,
    user: UserDto,
    name: string,
    category: Category,
    isActive: boolean,
    transactionData: Date
}
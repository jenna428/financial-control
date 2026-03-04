import { Category } from "src/enums/enums";
import { UserDto } from "./user.dto";

export interface TransactionTypeDto{
    id: number,
    user: UserDto,
    name: string,
    category: Category,
    isFixed: boolean
}
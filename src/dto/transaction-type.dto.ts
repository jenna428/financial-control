import { TransictionType } from "src/enums/enums";
import { UserDto } from "./user.dto";

export interface TransactionTypeDto{
    id: number,
    user: UserDto,
    name: String,
    type: TransictionType,
    isFixed: boolean
}
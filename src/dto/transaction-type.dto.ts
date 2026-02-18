import { TransictionType } from "src/enums/enums";
import { UserDto } from "./user.dto";

export interface TransactionTypeDto{
    user: UserDto,
    name: String,
    type: TransictionType,
    isFixed: boolean
}
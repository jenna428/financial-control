import { UserDto } from "./user.dto";

export interface VariableExpenditureDto{
    id: number,
    user: UserDto,
    name: string,
    isActive: boolean,
}
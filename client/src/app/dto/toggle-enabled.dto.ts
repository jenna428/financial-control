import { Category } from "../classes/enums/enums";

export interface ToggleEnabledDto {
    name: string,
    id: number,
    category: Category,
    isFixed: boolean
}
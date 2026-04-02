import { VariableExpenditureDto} from "src/dto/variable-expenditure.dto";
import { VariableExpenditureEntity} from "src/entity/variable-expenditure.entity";


export class VariableExpenditureMapper{
    static toDto(variableExpenditureEntity: VariableExpenditureEntity): VariableExpenditureDto{
        const variableExpenditureDto: VariableExpenditureDto = {
            id: variableExpenditureEntity.id,
            user: variableExpenditureEntity.user,
            name: variableExpenditureEntity.name,
            isActive: variableExpenditureEntity.isActive,
        }
        return variableExpenditureDto;
    }

    static toEntity(variableExpenditureDto: VariableExpenditureDto, userId: number) : VariableExpenditureEntity {
        const variableExpenditureEntity: VariableExpenditureEntity = {
            id: variableExpenditureDto.id,
            userId: userId,
            name: variableExpenditureDto.name,
            isActive: variableExpenditureDto.isActive,
        }
        return variableExpenditureEntity
    }
}
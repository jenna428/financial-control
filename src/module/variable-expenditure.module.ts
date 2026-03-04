import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VariableExpenditureController } from "src/controllers/variable-expenditure.controller";
import { VariableExpenditureEntity } from "src/entity/variable-expenditure.entity";
import { VariableExpenditureRepository } from "src/repository/variable-expenditure.repository";
import { VariableExpenditureService } from "src/services/variable-expenditure.service";


@Module({
    imports: [TypeOrmModule.forFeature([VariableExpenditureEntity])],
    controllers: [VariableExpenditureController],
    providers: [VariableExpenditureService, VariableExpenditureRepository],
})
export class VariableExpenditureModule{}
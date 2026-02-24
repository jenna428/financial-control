import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransationTypeController } from "src/controllers/transaction-type.controller";
import { TransactionTypeEntity } from "src/entity/transaction-type.entity";
import { TransactionTypeRepository } from "src/repository/transaction-type.repository";
import { TransactionTypeService } from "src/services/transaction-type.service";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionTypeEntity])],
    controllers: [TransationTypeController],
    providers: [TransactionTypeService, TransactionTypeRepository],
})
export class TransactionTypeModule{}
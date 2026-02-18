import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionTypeEntity } from "src/entity/transaction-type.entity";
import { TransactionTypeRepository } from "src/repository/transaction-type.repository";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionTypeEntity])],
    controllers: [],
    providers: [TransactionTypeRepository],
})
export class TransactionTypeModule{}
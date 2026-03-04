import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FixedTransactionController } from "src/controllers/fixed-transaction.controller";
import { FixedTransactionEntity } from "src/entity/fixed-transaction.entity";
import { FixedTransactionRepository } from "src/repository/fixed-transaction.repository";
import { FixedTransactionService } from "src/services/fixed-transaction.service";

@Module({
    imports: [TypeOrmModule.forFeature([FixedTransactionEntity])],
    controllers: [FixedTransactionController],
    providers: [FixedTransactionService, FixedTransactionRepository],
})
export class FixedTransactionModule{}
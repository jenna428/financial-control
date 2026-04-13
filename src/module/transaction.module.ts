import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "src/controllers/transaction.controller";
import { TransactionEntity } from "src/entity/transaction.entity";
import { TransactionRepository } from "src/repository/transaction.repository";
import { Transaction2Repository } from "src/repository/transaction2.repository";
import { TransactionService } from "src/services/transaction.service";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity])],
    controllers: [TransactionController],
    providers: [TransactionService, TransactionRepository, Transaction2Repository]
})
export class TransactionModule {}
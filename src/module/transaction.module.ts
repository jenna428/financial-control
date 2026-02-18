import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionEntity } from "src/entity/transaction.entity";
import { TransactionRepository } from "src/repository/transaction.repository";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity])],
    controllers: [],
    providers: [TransactionRepository]
})
export class TransactionModule {}
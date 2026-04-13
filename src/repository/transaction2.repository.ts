import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "src/entity/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class Transaction2Repository extends Repository<TransactionEntity> {

    constructor (
        @InjectRepository(TransactionEntity)
        private repository: Repository<TransactionEntity> 
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    public async getTransactionsByUserId(userId: number): Promise<TransactionEntity[]> {
        return await this.repository.find({
            relations: ['expenditure'],
            where: {
                userId: userId
            }
        });
    }
}
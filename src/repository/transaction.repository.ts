import { Injectable } from "@nestjs/common";
import { TransactionEntity } from "src/entity/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionRepository extends Repository<TransactionEntity> {}
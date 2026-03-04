import { Injectable } from "@nestjs/common";
import { FixedTransactionEntity } from "src/entity/fixed-transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class FixedTransactionRepository extends Repository<FixedTransactionEntity>{}
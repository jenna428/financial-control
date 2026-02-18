import { Injectable } from "@nestjs/common";
import { TransactionTypeEntity } from "src/entity/transaction-type.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionTypeRepository extends Repository<TransactionTypeEntity>{}
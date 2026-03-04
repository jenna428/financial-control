import { Injectable } from "@nestjs/common";
import { VariableExpenditureEntity } from "src/entity/variable-expenditure.entity";
import { Repository } from "typeorm";

@Injectable()
export class VariableExpenditureRepository extends Repository<VariableExpenditureEntity>{}
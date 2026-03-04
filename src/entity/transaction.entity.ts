import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { VariableExpenditureEntity } from "./variable-expenditure.entity";

Entity()
export class TransactionEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @ManyToOne(type => VariableExpenditureEntity)
    expenditure: VariableExpenditureEntity;

    @Column()
    amount: number;

    @Column()
    description: string;

    @Column()
    transactionDate: Date;
}
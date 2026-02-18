import { Column, CreateDateColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { TransactionTypeEntity } from "./transaction-type.entity";

export class TransactionEntity {
    @PrimaryColumn()
    id?: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;
    
    @ManyToOne(type => TransactionTypeEntity)
    transactionType: TransactionTypeEntity;

    @Column()
    amount: number;

    @Column()
    description: String;

    @Column()
    transactionDate: Date;
}
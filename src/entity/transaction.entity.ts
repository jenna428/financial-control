import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

Entity()
export class TransactionEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @Column()
    amount: number;

    @Column()
    description: string;

    @Column()
    transactionDate: Date;
}
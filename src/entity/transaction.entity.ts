import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { VariableExpenditureEntity } from "./variable-expenditure.entity";

@Entity()
export class TransactionEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;

    @Column()
    expenditureId: number;

    @ManyToOne(type => VariableExpenditureEntity)
    @JoinColumn({ name: 'expenditureId' })
    expenditure?: VariableExpenditureEntity;

    @Column()
    amount: number;

    @Column()
    description: string;

    @Column()
    @Index()
    transactionDate: Date;
}
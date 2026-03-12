import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { Category } from "src/enums/enums";

@Entity()
export class FixedTransactionEntity {
    @PrimaryColumn()
    id?: number;

    @CreateDateColumn({ type: 'datetime' })
    createDate?: Date;

    @Column()
    userId: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;

    @Column()
    name: string;

    @Column()
    amount: number;

    @Column()
    category: Category;

    @Column()
    isActive: boolean;

    @Column()
    transactionDate: Date;
}
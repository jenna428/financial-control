import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { Category } from "src/enums/enums";

@Entity()
export class FixedTransactionEntity {
    @PrimaryColumn()
    id: number;

    @CreateDateColumn({ type: 'datetime' })
    createDate?: Date;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @Column()
    name: string;

    @Column()
    category: Category;

    @Column()
    isActive: boolean;

    @Column()
    transactionDate: Date;
}
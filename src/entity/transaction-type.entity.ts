import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { Category } from "src/enums/enums";

@Entity()
export class TransactionTypeEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @Column()
    name: string;

    @Column()
    category: Category;

    @Column()
    isFixed: boolean;

    @CreateDateColumn({ type: 'datetime' })
    createDate?: Date;
}
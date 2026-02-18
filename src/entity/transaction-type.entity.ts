import { Column, CreateDateColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { TransictionType } from "src/enums/enums";

export class TransactionTypeEntity {
    @PrimaryColumn()
    id?: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @Column()
    name: String;

    @Column()
    type: TransictionType;

    @Column()
    isFixed: boolean;

    @CreateDateColumn({ type: 'datetime' })
    createDate?: Date;
}
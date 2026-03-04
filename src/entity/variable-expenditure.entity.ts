import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class VariableExpenditureEntity{
    @PrimaryColumn()
    id: number;

    @ManyToOne(type => UserEntity)
    user: UserEntity;

    @Column()
    name: string

    @Column()
    isActive: boolean;
}
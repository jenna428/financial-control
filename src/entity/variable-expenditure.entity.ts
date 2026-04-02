import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class VariableExpenditureEntity{
    @PrimaryColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;

    @Column()
    name: string

    @Column()
    isActive: boolean;
}
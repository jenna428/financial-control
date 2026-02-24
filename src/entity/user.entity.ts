import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    email: String;

    @Column()
    password: String;

    @CreateDateColumn({ type: 'datetime' })
    createDate?: Date;
}
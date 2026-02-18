import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class UserEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: String;

    @Column()
    email: String;

    @Column()
    password: String;

    @CreateDateColumn({ type: 'datetime' })
    createDate?: Date;
}
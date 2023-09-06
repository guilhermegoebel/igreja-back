import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Noiva{

    @PrimaryGeneratedColumn()
    noivaId: number

    @Column()
    name: string

    @Column()
    contact: string
}
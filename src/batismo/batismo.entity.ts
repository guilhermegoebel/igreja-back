import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Batismo{

    @PrimaryGeneratedColumn()
    batismoId: number

    @Column()
    name: string

    @Column()
    contact: string
}
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserRole } from "./enum/user-role.enum";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    userId: number

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: null,
      })
      role: UserRole;
}
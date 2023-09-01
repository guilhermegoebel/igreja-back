import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dto/createUser.dto";
import { ConflictException } from "@nestjs/common";
import { UserRole } from "./enum/user-role.enum";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
      ) { }

      async createUser(userData: CreateUserDto): Promise<User> {

        const existingUser = await this.userRepository.findOne({
          where: [{ username: userData.username }],
        });
    
        if (existingUser) {
          throw new ConflictException('Usuário já existe');
        }
    
        const user = new User();
        user.username = userData.username;
        user.password = await this.hashPassword(userData.password);
        if(userData.role == '1'){
            user.role = UserRole.PASTORAL_FAMILIAR
        }
        if(userData.role == '2'){
            user.role = UserRole.PASTORAL_BATISMO
        }
        if(userData.role == '3'){
            user.role = UserRole.PASTORAL_CATEQUESE
        }
        if(userData.role == '4'){
            user.role = UserRole.ESCRITORIO_PAROQUIAL
        }
    
        return this.userRepository.save(user)
      }
    
      async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
      }

    async findUserByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({ where: { username } });
      }
}
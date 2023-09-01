import { Controller, Post, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { Response } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { Public } from 'src/auth/auth.guard';

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService) {}
    
    @Public()
    @Post('/register')
    async createUser(@Body() userData: CreateUserDto, @Res() res: Response) {
      try {
        const createdUser: User = await this.userService.createUser(userData)
        const response = {
          message: 'Usuário criado com sucesso',
          user: createdUser,
        }
        res.status(201).json(response);
      } catch (error) {
        throw new HttpException('Erro ao criar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    
}
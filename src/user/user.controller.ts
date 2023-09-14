import { Controller, Post, Body, Res, HttpException, HttpStatus, Get, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { User } from './user.entity';
import { Response } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { AuthGuard, Public, Role } from 'src/auth/auth.guard';
import { UserRole } from './enum/user-role.enum';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserAdminDto } from './dto/createUserAdmin.dto';
import { error } from 'console';

@Controller('user')
@UseGuards(AuthGuard)
@Role(UserRole.ESCRITORIO_PAROQUIAL)
export class UserController {
  constructor(private readonly userService: UserService) { }

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

  @Public()
  @Post('/registerAdmin')
  async createUserAdmin(@Body() userData: CreateUserAdminDto, @Res() res: Response) {
    try {
      const createdUser = await this.userService.createUserAdmin(userData)
      if(createdUser){
        const response = {
          message: 'Usuário criado com sucesso',
          user: createdUser,
        }
        res.status(201).json(response);
      }else throw new error
          
    } catch (error) {
      throw new HttpException('Erro ao criar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':userId')
  async findUserById(@Param('userId') userId: number, @Res() res: Response) {
    try {
      const user: User = await this.userService.findUserById(userId);
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      res.status(200).json(user);

    } catch (error) {
      throw new HttpException('Erro ao buscar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':username/getByUsername')
  async findUserByUsername(@Param('username') username: string, @Res() res: Response) {
    try {
      const user: User = await this.userService.findUserByUsername(username);
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      res.status(200).json(user);

    } catch (error) {
      throw new HttpException('Erro ao buscar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAllUsers(@Res() res: Response) {
    try {
      const users: User[] = await this.userService.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      throw new HttpException('Erro ao buscar usuários', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    try {
      const updatedUser = await this.userService.updateUser(userId, updateUserDto);
      if (!updatedUser) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      res.status(HttpStatus.OK).json(updatedUser);
    } catch (error) {
      throw new HttpException('Erro ao atualizar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string, @Res() res: Response) {
    try {
      await this.userService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      throw new HttpException('Erro ao excluir usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
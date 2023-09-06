import { Controller, Post, Body, Res, HttpException, HttpStatus, Request, Get, Param, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard, Public, Role } from 'src/auth/auth.guard';
import { Noiva } from './noiva.entity';
import { UpdateNoivaDto } from './dto/updateNoiva.dto';
import { CreateNoivaDto } from './dto/createNoiva.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { UserRole } from 'src/user/enum/user-role.enum';
import { NoivaService } from './noiva.service';

@UseGuards(AuthGuard)
@Role(UserRole.PASTORAL_FAMILIAR)
@Controller('noiva')
export class NoivaController {
  constructor(private readonly noivaService: NoivaService) { }

  @Public()
  @Post('/createCursoNoiva')
  async createNoiva(@Body() noivaData: CreateNoivaDto, @Res() res: Response) {
    try {
      const createdNoiva: Noiva = await this.noivaService.createNoiva(noivaData)
      const response = {
        message: 'Inscrição curso de noiva realizada com sucesso',
        noiva: createdNoiva,
      }
      res.status(201).json(response);
    } catch (error) {
      throw new HttpException('Erro ao realizar inscrição no curso de noiva', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllNoivas(@Request() req: any, @Res() res: Response) {
    try {
      const noivas: Noiva[] = await this.noivaService.getAll();
      return res.status(200).json(noivas);
    } catch (error) {
      throw new HttpException('Erro ao buscar lista de inscrições para o curso de noiva', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':noivaId')
  async findNoivaoById(@Param('noivaId') noivaId: number, @Res() res: Response) {
    try {
      const noiva: Noiva = await this.noivaService.findNoivaById(noivaId);
      if (!noiva) {
        throw new HttpException('Inscrição no curso de noiva não encontrada', HttpStatus.NOT_FOUND);
      }
      res.status(200).json(noiva);

    } catch (error) {
      throw new HttpException('Erro ao buscar inscrição no curso de noiva', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':noivaId')
  async updateNoiva(@Param('noivaId') noivaId: number, @Body() updateNoivaDto: UpdateNoivaDto, @Res() res: Response) {
    try {
      const updatedNoiva = await this.noivaService.updateNoiva(noivaId, updateNoivaDto);
      if (!updatedNoiva) {
        throw new HttpException('Inscrição no curso de noiva não encontrada', HttpStatus.NOT_FOUND);
      }
      res.status(HttpStatus.OK).json(updatedNoiva);
    } catch (error) {
      throw new HttpException('Erro ao atualizar inscrição no curso de noiva', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':noivaId')
  async deleteBatismo(@Param('noivaId') noivaId: string, @Res() res: Response) {
    try {
      await this.noivaService.deleteNoiva(noivaId);
      res.status(204).send();
    } catch (error) {
      throw new HttpException('Erro ao excluir inscrição para o curso denoiva', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
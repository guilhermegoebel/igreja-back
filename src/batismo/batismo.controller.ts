import { Controller, Post, Body, Res, HttpException, HttpStatus, Request, Get, Param, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard, Public, Role } from 'src/auth/auth.guard';
import { Batismo } from './batismo.entity';
import { CreateBatismoDto } from './dto/createBatismo.dto';
import { BatismoService } from './batismo.service';
import { UseGuards } from '@nestjs/common/decorators/core';
import { UserRole } from 'src/user/enum/user-role.enum';
import { UpdateBatismoDto } from './dto/updateBatismo.dto';

@UseGuards(AuthGuard)
@Role(UserRole.PASTORAL_BATISMO)
@Controller('batismo')
export class BatismoController {
  constructor(private readonly batismoService: BatismoService) { }

  @Public()
  @Post('/createBatismo')
  async createUser(@Body() batismoData: CreateBatismoDto, @Res() res: Response) {
    try {
      const createdBatismo: Batismo = await this.batismoService.createBatismo(batismoData)
      const response = {
        message: 'Inscrição curso de batismo realizada com sucesso',
        batismo: createdBatismo,
      }
      res.status(201).json(response);
    } catch (error) {
      throw new HttpException('Erro ao realizar inscrição no curso de batismo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllBatismos(@Request() req: any, @Res() res: Response) {
    try {
      const batismos: Batismo[] = await this.batismoService.getAll();
      return res.status(200).json(batismos);
    } catch (error) {
      throw new HttpException('Erro ao buscar lista de inscrições para o curso de batismo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':batismoId')
  async findBatismoById(@Param('batismoId') batismoId: number, @Res() res: Response) {
    try {
      const batismo: Batismo = await this.batismoService.findBatismoById(batismoId);
      if (!batismo) {
        throw new HttpException('Inscrição no curso de batismo não encontrada', HttpStatus.NOT_FOUND);
      }
      res.status(200).json(batismo);

    } catch (error) {
      throw new HttpException('Erro ao buscar inscrição no curso de batismo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':batismoId')
  async updateBatismo(@Param('batismoId') batismoId: number, @Body() updateBatismoDto: UpdateBatismoDto, @Res() res: Response) {
    try {
      const updatedBatismo = await this.batismoService.updateBatismo(batismoId, updateBatismoDto);
      if (!updatedBatismo) {
        throw new HttpException('Inscrição no curso de batismo não encontrada', HttpStatus.NOT_FOUND);
      }
      res.status(HttpStatus.OK).json(updatedBatismo);
    } catch (error) {
      throw new HttpException('Erro ao atualizar inscrição no curso de batismo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':batismoId')
  async deleteBatismo(@Param('batismoId') batismoId: string, @Res() res: Response) {
    try {
      await this.batismoService.deleteBatismo(batismoId);
      res.status(204).send();
    } catch (error) {
      throw new HttpException('Erro ao excluir inscrição para o curso de batismo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
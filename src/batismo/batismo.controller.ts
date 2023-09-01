import { Controller, Post, Body, Res, HttpException, HttpStatus, Request, Get} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard, Public } from 'src/auth/auth.guard';
import { Batismo } from './batismo.entity';
import { CreateBatismoDto } from './dto/createBatismo.dto';
import { BatismoService } from './batismo.service';
import { UseGuards } from '@nestjs/common/decorators/core';

@Controller('batismo')
export class BatismoController{
    constructor( private readonly batismoService: BatismoService) {}
    
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

}
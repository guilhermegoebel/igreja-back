import { Module } from '@nestjs/common';
import { BatismoController } from './batismo.controller';
import { BatismoService } from './batismo.service';
import { Batismo } from './batismo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Batismo])],
  controllers: [BatismoController],
  providers: [BatismoService],
  exports: [BatismoService],
})
export class BatismoModule {}
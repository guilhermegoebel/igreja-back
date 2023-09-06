import { Module } from '@nestjs/common';
import { NoivaController } from './noiva.controller';
import { NoivaService } from './noiva.service';
import { Noiva } from './noiva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Noiva])],
  controllers: [NoivaController],
  providers: [NoivaService],
  exports: [NoivaService],
})
export class NoivaModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BatismoModule } from './batismo/batismo.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { NoivaModule } from './noiva/noiva.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      inject: [TypeOrmConfig],
    }),
    UserModule,
    AuthModule,
    BatismoModule,
    NoivaModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {  
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ],
})
export class AppModule {}

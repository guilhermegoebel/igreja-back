import { IsString, IsOptional } from 'class-validator';

export class UpdateNoivaDto {
  
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  contact?: string;
}
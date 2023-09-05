import { IsString, IsOptional } from 'class-validator';
export class UpdateBatismoDto {
  
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  contact?: string;
}
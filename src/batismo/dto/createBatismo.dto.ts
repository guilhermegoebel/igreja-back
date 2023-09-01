import { IsString, IsNotEmpty} from "class-validator";

export class CreateBatismoDto{

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    contact: string
}
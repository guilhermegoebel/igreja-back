import { IsString, IsNotEmpty} from "class-validator";

export class CreateNoivaDto{

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    contact: string
}
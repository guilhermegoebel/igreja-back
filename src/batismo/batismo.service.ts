import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Batismo } from "./batismo.entity";
import { CreateBatismoDto } from "./dto/createBatismo.dto";


@Injectable()
export class BatismoService{
    constructor(
        @InjectRepository(Batismo)
        private readonly batismoRepository: Repository<Batismo>
      ) { }

      async createBatismo(batismoData: CreateBatismoDto): Promise<Batismo> {
        const batismo = new Batismo()
        batismo.name = batismoData.name
        batismo.contact = batismoData.contact

        return this.batismoRepository.save(batismo)
      }

      async getAll (): Promise<Batismo[]>{
        const batismos: Batismo[] = await this.batismoRepository.find()
        return batismos
    }

}
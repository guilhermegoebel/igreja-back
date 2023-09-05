import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Batismo } from "./batismo.entity";
import { CreateBatismoDto } from "./dto/createBatismo.dto";
import { UpdateBatismoDto } from "./dto/updateBatismo.dto";

@Injectable()
export class BatismoService {
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

  async getAll(): Promise<Batismo[]> {
    const batismos: Batismo[] = await this.batismoRepository.find()
    return batismos
  }

  async findBatismoById(batismoId: number): Promise<Batismo> {
    return this.batismoRepository.findOne({ where: { batismoId } });
  }

  async deleteBatismo(batismoId: string): Promise<void> {
    await this.batismoRepository.delete(batismoId)
  }

  async updateBatismo(batismoId: number, updateBatismoDto: UpdateBatismoDto): Promise<Batismo> {
    const batismo = await this.findBatismoById(batismoId);

    if (!batismo) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (updateBatismoDto.name) {
      batismo.name = updateBatismoDto.name;
    }

    if (updateBatismoDto.contact) {
      batismo.contact = updateBatismoDto.contact
    }
    return this.batismoRepository.save(batismo);
  }
}
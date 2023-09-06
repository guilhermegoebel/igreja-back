import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Noiva } from "./noiva.entity";
import { CreateNoivaDto } from "./dto/createNoiva.dto";
import { UpdateNoivaDto } from "./dto/updateNoiva.dto";

@Injectable()
export class NoivaService {
  constructor(
    @InjectRepository(Noiva)
    private readonly noivaRepository: Repository<Noiva>
  ) { }

  async createNoiva(noivaData: CreateNoivaDto): Promise<Noiva> {
    const noiva = new Noiva()
    noiva.name = noivaData.name
    noiva.contact = noivaData.contact

    return this.noivaRepository.save(noiva)
  }

  async getAll(): Promise<Noiva[]> {
    const noivas: Noiva[] = await this.noivaRepository.find()
    return noivas
  }

  async findNoivaById(noivaId: number): Promise<Noiva> {
    return this.noivaRepository.findOne({ where: { noivaId } });
  }

  async deleteNoiva(noivaId: string): Promise<void> {
    await this.noivaRepository.delete(noivaId)
  }

  async updateNoiva(noivaId: number, updateNoivaDto: UpdateNoivaDto): Promise<Noiva> {
    const noiva = await this.findNoivaById(noivaId);

    if (!noiva) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (updateNoivaDto.name) {
      noiva.name = updateNoivaDto.name;
    }

    if (updateNoivaDto.contact) {
      noiva.contact = updateNoivaDto.contact
    }
    return this.noivaRepository.save(noiva);
  }
}
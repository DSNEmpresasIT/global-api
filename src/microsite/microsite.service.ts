import { Injectable } from '@nestjs/common';
import { CreateMicrositeDto } from './dto/create-microsite.dto';

@Injectable()
export class MicrositeService {
  async create(companyId: number, createMicrositeDto: CreateMicrositeDto) {
    return createMicrositeDto;
  }

  async getAllMicrosites() {
    return `This action returns all microsite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} microsite`;
  }

  update(id: number, updateMicrositeDto) {
    return `This action updates a #${id} microsite`;
  }

  remove(id: number) {
    return `This action removes a #${id} microsite`;
  }
}
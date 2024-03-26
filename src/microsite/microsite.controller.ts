import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MicrositeService } from './microsite.service';
import { CreateMicrositeDto } from './dto/create-microsite.dto';


@Controller('api/microsite')
export class MicrositeController {
  constructor(private readonly micrositeService: MicrositeService) {}

  @Post('create/:companyId')
  async create(@Param('companyId') companyId, @Body() createMicrositeDto: CreateMicrositeDto) {
    return await this.micrositeService.create(companyId, createMicrositeDto);
  }

  @Get('all')
  async getAllMicrosites() {
    return await this.micrositeService.getAllMicrosites();
  }

  @Get(':micrositeId')
  async getMicrositeById() {
    
  }

  @Get('company/:companyId')
  async getMicrositeByCompanyId(@Param('id') id: number) {
    return this.micrositeService.findOne(id);
  }

  @Patch(':micrositeId')
  async updateMicrosite(@Param('id') id: number, @Body() updateMicrositeDto) {
    return this.micrositeService.update(id, updateMicrositeDto);
  }
}

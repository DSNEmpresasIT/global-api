import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MicrositeService } from './microsite.service';
import { CreateMicrositeDto } from './dto/create-microsite.dto';


@Controller('microsite')
export class MicrositeController {
  constructor(private readonly micrositeService: MicrositeService) {}

  @Post()
  create(@Body() createMicrositeDto: CreateMicrositeDto) {
    return this.micrositeService.create(createMicrositeDto);
  }

  @Get()
  findAll() {
    return this.micrositeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.micrositeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMicrositeDto) {
    return this.micrositeService.update(+id, updateMicrositeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.micrositeService.remove(+id);
  }
}

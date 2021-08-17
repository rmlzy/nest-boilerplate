import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseController } from '~/core';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';

@Controller('access')
export class AccessController extends BaseController {
  constructor(private readonly accessService: AccessService) {
    super();
  }

  @Post()
  async create(@Body() createAccessDto: CreateAccessDto) {
    const data = await this.accessService.create(createAccessDto);
    return this.success(data);
  }

  @Get()
  async findAll() {
    const data = await this.accessService.findAll();
    return this.success(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.accessService.findOne(+id);
    return this.success(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccessDto: UpdateAccessDto) {
    const data = await this.accessService.update(+id, updateAccessDto);
    return this.success(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.accessService.remove(+id);
    return this.success(data);
  }
}

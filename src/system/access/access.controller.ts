import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '~/core';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';

@ApiTags('资源')
@Controller('access')
export class AccessController extends BaseController {
  constructor(private readonly accessService: AccessService) {
    super();
  }

  @ApiOperation({ description: '创建资源' })
  @Post()
  async create(@Body() createAccessDto: CreateAccessDto) {
    const data = await this.accessService.create(createAccessDto);
    return this.success(data);
  }

  @ApiOperation({ description: '查询资源列表' })
  @Get()
  async findAll() {
    const data = await this.accessService.findAll();
    return this.success(data);
  }

  @ApiOperation({ description: '查询资源详情' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.accessService.findOne(+id);
    return this.success(data);
  }

  @ApiOperation({ description: '修改资源' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccessDto: UpdateAccessDto) {
    const data = await this.accessService.update(+id, updateAccessDto);
    return this.success(data);
  }

  @ApiOperation({ description: '删除资源' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.accessService.remove(+id);
    return this.success(data);
  }
}

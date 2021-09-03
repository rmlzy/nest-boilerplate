import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmptyVo, Utils } from '~/core';
import { CreateAccessDto, UpdateAccessDto } from './access.dto';
import { AccessService } from './access.service';
import { CreateAccessVo, FindAccessVo, PaginateAccessVo } from './access.vo';

@ApiTags('资源')
@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @ApiOperation({ description: '创建资源' })
  @ApiOkResponse({ type: CreateAccessVo })
  @Post()
  async create(@Body() createAccessDto: CreateAccessDto) {
    const data = await this.accessService.create(createAccessDto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '查询资源列表' })
  @ApiOkResponse({ type: PaginateAccessVo, isArray: true })
  @Get()
  async paginate() {
    const data = await this.accessService.paginate();
    return Utils.success(data);
  }

  @ApiOperation({ description: '查询资源详情' })
  @ApiOkResponse({ type: FindAccessVo })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.accessService.findOne(+id);
    return Utils.success(data);
  }

  @ApiOperation({ description: '修改资源' })
  @ApiOkResponse({ type: EmptyVo })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAccessDto) {
    const data = await this.accessService.update(+id, dto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '删除资源' })
  @ApiOkResponse({ type: EmptyVo })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.accessService.remove(+id);
    return Utils.success(data);
  }
}

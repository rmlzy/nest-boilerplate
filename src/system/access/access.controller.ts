import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiEmptyResp, ApiOkResp, ApiPageResp, Utils } from '~/core';
import { CreateAccessDto, UpdateAccessDto } from './access.dto';
import { AccessService } from './access.service';
import { CreateAccessVo, FindAccessVo, PageAccessVo } from './access.vo';

@ApiTags('资源')
@ApiExtraModels(CreateAccessVo, PageAccessVo, FindAccessVo)
@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @ApiOperation({ description: '创建资源' })
  @ApiOkResp(CreateAccessVo)
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CreateAccessDto) {
    const data = await this.accessService.create(dto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '查询资源列表' })
  @ApiPageResp(PageAccessVo)
  @Get()
  @HttpCode(HttpStatus.OK)
  async paginate(@Query() query) {
    const { skip, take } = Utils.parseQuery(query);
    const data = await this.accessService.paginate({ skip, take });
    return Utils.success(data);
  }

  @ApiOperation({ description: '查询资源详情' })
  @ApiOkResp(FindAccessVo)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.accessService.findOne(+id);
    return Utils.success(data);
  }

  @ApiOperation({ description: '修改资源' })
  @ApiEmptyResp()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateAccessDto) {
    const data = await this.accessService.update(+id, dto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '删除资源' })
  @ApiEmptyResp()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const data = await this.accessService.remove(+id);
    return Utils.success(data);
  }
}

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
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { RoleService } from './role.service';
import { CreateRoleVo, FindRoleVo, PageRoleVo } from './role.vo';

@ApiTags('角色')
@ApiExtraModels(CreateRoleVo, PageRoleVo, FindRoleVo)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ description: '创建角色' })
  @ApiOkResp(CreateRoleVo)
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CreateRoleDto) {
    const data = await this.roleService.create(dto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '角色列表' })
  @ApiPageResp(PageRoleVo)
  @Get()
  @HttpCode(HttpStatus.OK)
  async paginate(@Query() query) {
    const { skip, take } = Utils.parseQuery(query);
    const data = await this.roleService.paginate({ skip, take });
    return Utils.success(data);
  }

  @ApiOperation({ description: '角色详情' })
  @ApiOkResp(FindRoleVo)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.roleService.findOne(+id);
    return Utils.success(data);
  }

  @ApiOperation({ description: '更新角色' })
  @ApiEmptyResp()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    const data = await this.roleService.update(+id, dto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '删除角色' })
  @ApiEmptyResp()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const data = await this.roleService.remove(+id);
    return Utils.success(data);
  }
}

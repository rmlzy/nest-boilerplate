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
import { BaseController } from '~/core';
import { EmptyVo } from '~/core/base/base.vo';
import { CreateRoleVo } from '~/system/role/vo/create-role.vo';
import { RoleBaseVo, RoleVo } from '~/system/role/vo/role.vo';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@ApiTags('角色')
@Controller('role')
export class RoleController extends BaseController {
  constructor(private readonly roleService: RoleService) {
    super();
  }

  @ApiOperation({ description: '创建角色' })
  @ApiOkResponse({ type: CreateRoleVo })
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    const data = await this.roleService.create(dto);
    return this.success(data);
  }

  @ApiOperation({ description: '角色列表' })
  @ApiOkResponse({ type: RoleBaseVo, isArray: true })
  @Get()
  async findAll() {
    const data = await this.roleService.findAll();
    return this.success(data);
  }

  @ApiOperation({ description: '角色详情' })
  @ApiOkResponse({ type: RoleVo })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.roleService.findOne(+id);
    return this.success(data);
  }

  @ApiOperation({ description: '更新角色' })
  @ApiOkResponse({ type: EmptyVo })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    const data = await this.roleService.update(+id, dto);
    return this.success(data);
  }

  @ApiOperation({ description: '删除角色' })
  @ApiOkResponse({ type: EmptyVo })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.roleService.remove(+id);
    return this.success(data);
  }
}

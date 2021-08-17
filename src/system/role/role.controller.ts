import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '~/core';
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
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const data = await this.roleService.create(createRoleDto);
    return this.success(data);
  }

  @ApiOperation({ description: '角色列表' })
  @Get()
  async findAll() {
    const data = await this.roleService.findAll();
    return this.success(data);
  }

  @ApiOperation({ description: '角色详情' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.roleService.findOne(+id);
    return this.success(data);
  }

  @ApiOperation({ description: '更新角色' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const data = await this.roleService.update(+id, updateRoleDto);
    return this.success(data);
  }

  @ApiOperation({ description: '删除角色' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.roleService.remove(+id);
    return this.success(data);
  }
}

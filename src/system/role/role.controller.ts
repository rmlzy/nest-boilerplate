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
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RoleService } from './role.service';
import { CreateRoleVo, FindRoleVo, PaginateRoleVo } from './vo';

@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ description: '创建角色' })
  @ApiOkResponse({ type: CreateRoleVo })
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    const data = await this.roleService.create(dto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '角色列表' })
  @ApiOkResponse({ type: PaginateRoleVo, isArray: true })
  @Get()
  async paginate() {
    const data = await this.roleService.paginate();
    return Utils.success(data);
  }

  @ApiOperation({ description: '角色详情' })
  @ApiOkResponse({ type: FindRoleVo })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.roleService.findOne(+id);
    return Utils.success(data);
  }

  @ApiOperation({ description: '更新角色' })
  @ApiOkResponse({ type: EmptyVo })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    const data = await this.roleService.update(+id, dto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '删除角色' })
  @ApiOkResponse({ type: EmptyVo })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.roleService.remove(+id);
    return Utils.success(data);
  }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Utils } from '~/core';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { CreateUserVo, FindUserVo, PaginateUserVo } from './vo';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: '创建用户' })
  @ApiOkResponse({ type: CreateUserVo })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const data = await this.userService.create(dto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '查询用户列表' })
  @ApiOkResponse({ type: PaginateUserVo, isArray: true })
  @Get()
  async paginate(@Query() query) {
    const data = await this.userService.paginate(query);
    return Utils.success(data);
  }

  @ApiOperation({ description: '查询用户' })
  @ApiOkResponse({ type: FindUserVo })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(+id);
    return Utils.success(data);
  }
}

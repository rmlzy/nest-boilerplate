import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '~/core';
import { UserDetailVo } from '~/system/user/vo/user-detail.vo';
import { UserProfileVo } from '~/system/user/vo/user-profile.vo';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { CreateUserVo } from './vo/create-user.vo';

@ApiTags('用户')
@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @ApiOperation({ description: '创建用户' })
  @ApiOkResponse({ type: CreateUserVo })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const data = await this.userService.create(dto);
    return this.success(data);
  }

  @ApiOperation({ description: '查询用户列表' })
  @ApiOkResponse({ type: UserProfileVo, isArray: true })
  @Get()
  async paginate() {
    const data = await this.userService.paginate();
    return this.success(data);
  }

  @ApiOperation({ description: '查询用户' })
  @ApiOkResponse({ type: UserDetailVo })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(+id);
    return this.success(data);
  }
}

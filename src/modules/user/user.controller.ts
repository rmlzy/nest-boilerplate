import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BaseController } from '@/core';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('用户')
@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @ApiOperation({ description: '创建用户' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.userService.create(createUserDto);
    return this.success(res);
  }

  @ApiOperation({ description: '查询用户列表' })
  @Get()
  async paginate() {
    const res = await this.userService.paginate();
    return this.success(res);
  }

  @ApiOperation({ description: '查询用户' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.userService.findOne(id);
    return this.success(res);
  }
}

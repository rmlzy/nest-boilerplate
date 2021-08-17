import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '~/core';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @ApiOperation({ description: '创建用户' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);
    return this.success(data);
  }

  @ApiOperation({ description: '查询用户列表' })
  @Get()
  async paginate() {
    const data = await this.userService.paginate();
    return this.success(data);
  }

  @ApiOperation({ description: '查询用户' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(+id);
    return this.success(data);
  }
}

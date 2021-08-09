import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: '创建用户' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.userService.create(createUserDto);
    return { code: HttpStatus.OK, message: 'OK', data: res };
  }

  @ApiOperation({ description: '查询用户列表' })
  @Get()
  async findAll() {
    const res = await this.userService.findAll();
    return { code: HttpStatus.OK, message: 'OK', data: res };
  }

  @ApiOperation({ description: '查询用户' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.userService.findOne(+id);
    return { code: HttpStatus.OK, message: 'OK', data: res };
  }

  @ApiOperation({ description: '更新用户' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res = await this.userService.update(+id, updateUserDto);
    return { code: HttpStatus.OK, message: 'OK', data: res };
  }

  @ApiOperation({ description: '删除用户' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.userService.remove(+id);
    return { code: HttpStatus.OK, message: 'OK', data: res };
  }
}

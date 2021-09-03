import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResp, ApiPageResp, Utils } from '~/core';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
import { CreateUserVo, FindUserVo, PageUserVo } from './user.vo';

@ApiTags('用户')
@ApiExtraModels(CreateUserDto, PageUserVo, FindUserVo)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: '创建用户' })
  @ApiOkResp(CreateUserVo)
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() dto: CreateUserDto) {
    const data = await this.userService.create(dto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '查询用户列表' })
  @ApiPageResp(PageUserVo)
  @Get()
  @HttpCode(HttpStatus.OK)
  async paginate(@Query() query) {
    const {
      skip,
      take,
      username = '',
      realname = '',
    } = Utils.parseQuery(query);
    const data = await this.userService.paginate({
      skip,
      take,
      username,
      realname,
    });
    return Utils.success(data);
  }

  @ApiOperation({ description: '查询用户' })
  @ApiOkResp(FindUserVo)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(+id);
    return Utils.success(data);
  }
}

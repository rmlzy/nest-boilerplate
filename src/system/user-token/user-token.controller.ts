import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiEmptyResp, ApiOkResp, UserId, Utils } from '~/core';
import { UserService } from '~/system/user/user.service';
import { FindUserVo } from '~/system/user/user.vo';
import { LoginDto } from './user-token.dto';
import { UserTokenService } from './user-token.service';
import { LoginVo } from './user-token.vo';

@ApiTags('授权')
@ApiExtraModels(FindUserVo)
@Controller('')
export class UserTokenController {
  constructor(
    private tokenService: UserTokenService,
    private userService: UserService,
  ) {}

  @ApiOperation({ description: '登录' })
  @ApiOkResp(LoginVo)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const data = await this.tokenService.login(dto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '登出' })
  @ApiEmptyResp()
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Headers('token') token) {
    const data = await this.tokenService.logout(token);
    return Utils.success(data);
  }

  @ApiOperation({ description: '用户信息' })
  @ApiOkResp(FindUserVo)
  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async profile(@UserId() id: number) {
    const data = await this.userService.profile(id);
    return Utils.success(data);
  }
}

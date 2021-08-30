import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmptyVo, UserId, Utils } from '~/core';
import { UserService } from '~/system/user/user.service';
import { FindUserVo } from '~/system/user/vo';
import { LoginDto } from './dto/login.dto';
import { UserTokenService } from './user-token.service';

@ApiTags('授权')
@Controller('')
export class UserTokenController {
  constructor(
    private tokenService: UserTokenService,
    private userService: UserService,
  ) {}

  @ApiOperation({ description: '登录' })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const data: string = await this.tokenService.login(loginDto);
    return Utils.success(data);
  }

  @ApiOperation({ description: '登出' })
  @ApiOkResponse({ type: EmptyVo })
  @Post('/logout')
  async logout(@Headers('token') token) {
    const data = await this.tokenService.logout(token);
    return Utils.success(data);
  }

  @ApiOperation({ description: '用户信息' })
  @ApiOkResponse({ type: FindUserVo })
  @Get('/profile')
  async profile(@UserId() id: number) {
    const data = await this.userService.profile(id);
    return Utils.success(data);
  }
}

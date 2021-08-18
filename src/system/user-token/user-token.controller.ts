import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController, EmptyVo, UserId } from '~/core';
import { UserService } from '~/system/user/user.service';
import { UserProfileVo } from '~/system/user/vo/user-profile.vo';
import { LoginDto } from './dto/login.dto';
import { UserTokenService } from './user-token.service';

@ApiTags('授权')
@Controller('')
export class UserTokenController extends BaseController {
  constructor(
    private tokenService: UserTokenService,
    private userService: UserService,
  ) {
    super();
  }

  @ApiOperation({ description: '登录' })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const token: string = await this.tokenService.login(loginDto);
    return this.success(token);
  }

  @ApiOperation({ description: '登出' })
  @ApiOkResponse({ type: EmptyVo })
  @Post('/logout')
  async logout(@Headers('token') token) {
    const data = await this.tokenService.logout(token);
    return this.success(data);
  }

  @ApiOperation({ description: '用户信息' })
  @ApiOkResponse({ type: UserProfileVo })
  @Get('/profile')
  async profile(@UserId() id: number) {
    const data = await this.userService.profile(id);
    return this.success(data);
  }
}

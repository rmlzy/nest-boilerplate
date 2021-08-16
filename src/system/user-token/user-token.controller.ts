import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@/core';
import { UserTokenService } from './user-token.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('授权')
@Controller('')
export class UserTokenController extends BaseController {
  constructor(private readonly tokenService: UserTokenService) {
    super();
  }

  @ApiOperation({ description: '登录' })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const token: string = await this.tokenService.login(loginDto);
    return this.success(token);
  }

  @ApiOperation({ description: '登出' })
  @Post('/logout')
  async logout(@Headers('token') token) {
    const data = await this.tokenService.logout(token);
    return this.success(data);
  }
}

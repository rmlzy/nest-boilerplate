import { Controller, Post, Body, HttpStatus, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('授权')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: '登录' })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const res = await this.authService.login(loginDto);
    return { code: HttpStatus.OK, message: 'OK', data: res };
  }

  @ApiOperation({ description: '登出' })
  @Post('/logout')
  async logout(@Headers('token') token) {
    const res = await this.authService.logout(token);
    return { code: HttpStatus.OK, message: 'OK', data: res };
  }
}

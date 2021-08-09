import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BaseService } from '@/core';
import { UserService } from '@/modules/user/user.service';
import { LoginDto } from './dto/login.dto';
import { IJwtPayload } from './auth.interface';

@Injectable()
export class AuthService extends BaseService<any> {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super(null);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.verifyPassword(username, password);
    if (!user) {
      throw new HttpException('用户名或密码无效', HttpStatus.CONFLICT);
    }
    const payload: IJwtPayload = {
      id: user.id,
      username,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('TOKEN_EXPIRES_IN'),
    });
    await this.userService.setToken(user.id, token);
    return token;
  }

  async logout(token) {
    const user = await this.userService.findByToken(token);
    if (!user) {
      throw new HttpException('未检测到用户', HttpStatus.CONFLICT);
    }
    await this.userService.removeToken(user.id);
    return null;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BaseService } from '@/core';
import { UserService } from '@/system/user/user.service';
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

  async login(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;
    // 校验用户密码
    const valid = await this.userService.verifyPassword(username, password);
    if (!valid) {
      throw new HttpException('用户名或密码无效', HttpStatus.CONFLICT);
    }

    // 获取用户信息, 存储到 token 中
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new HttpException('未检测到用户', HttpStatus.CONFLICT);
    }

    const payload: IJwtPayload = { id: user.id, username };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('TOKEN_EXPIRES_IN'),
    });
    await this.userService.setToken(user.id, token);
    return token;
  }

  async logout(token: string): Promise<void> {
    const user = await this.userService.findByToken(token);
    if (!user) {
      throw new HttpException('未检测到用户', HttpStatus.CONFLICT);
    }
    await this.userService.removeToken(user.id);
  }

  decodeToken(token: string): IJwtPayload {
    return this.jwtService.decode(token, { json: true }) as IJwtPayload;
  }

  async updatePassword(token: string, newPassword: string): Promise<void> {
    const { id } = this.decodeToken(token);
    this.asset(id, '未检测到用户');
    await this.userService.updatePassword(id, newPassword);
  }
}

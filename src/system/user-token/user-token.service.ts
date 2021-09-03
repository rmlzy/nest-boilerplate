import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { IJwtPayload } from '~/core';
import { LoginVo } from '~/system/user-token/user-token.vo';
import { UserService } from '~/system/user/user.service';
import { LoginDto } from './user-token.dto';
import { UserTokenEntity } from './user-token.entity';

@Injectable()
export class UserTokenService {
  constructor(
    @InjectRepository(UserTokenEntity)
    private tokenRepo: Repository<UserTokenEntity>,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(dto: LoginDto): Promise<LoginVo> {
    const { username, password } = dto;

    const valid = await this.userService.verifyPassword(username, password);
    if (!valid) {
      throw new HttpException('用户名或密码无效', HttpStatus.CONFLICT);
    }

    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new HttpException('未检测到用户', HttpStatus.CONFLICT);
    }

    const expireInDay = this.configService.get('TOKEN_EXPIRES_IN_DAY') || 1;
    const payload: IJwtPayload = { id: user.id, username };
    const token = this.jwtService.sign(payload, {
      expiresIn: `${expireInDay}d`,
    });

    const expireAt = dayjs().add(expireInDay, 'day');
    await this.tokenRepo.save({
      userId: user.id,
      token,
      expireAt: expireAt.toISOString(),
    });
    return { token };
  }

  async logout(token: string): Promise<void> {
    await this.tokenRepo.delete({ token });
  }
}

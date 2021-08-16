import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@/core';

@Injectable()
export class Utils {
  static isDevelop() {
    return process.env.NODE_ENV === 'development';
  }

  static getTimestamp(date?: string) {
    const d = dayjs(date);
    return d.unix();
  }

  static sleep(ms: number = 0) {
    return (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  }

  // doc: https://github.com/kelektiv/node.bcrypt.js
  static generateHashedPassword(password: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  static validatePassword(password: string, hashedPassword: string): boolean {
    if (!password || !hashedPassword) {
      return false;
    }
    return bcrypt.compareSync(password, hashedPassword);
  }

  static decodeToken(token): IJwtPayload {
    const jwtService = new JwtService({});
    return jwtService.decode(token, { json: true }) as IJwtPayload;
  }
}

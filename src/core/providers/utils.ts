import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import * as _ from 'lodash';
import { IJwtPayload } from '~/core';

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

  static docToVo<T>(docs, Vo) {
    const vo = new Vo();
    return _.pick(docs, Object.keys(vo)) as T;
  }

  static docsToVo<T>(docs, Vo) {
    return (docs || []).map((doc) => Utils.docToVo(doc, Vo)) as T[];
  }

  static success(data) {
    return { statusCode: HttpStatus.OK, message: 'OK', data };
  }
}

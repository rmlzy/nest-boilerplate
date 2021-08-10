import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

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

  static generateHashedPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  static validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    if (!password || !hashedPassword) {
      return Promise.resolve(false);
    }
    return bcrypt.compare(password, hashedPassword);
  }
}

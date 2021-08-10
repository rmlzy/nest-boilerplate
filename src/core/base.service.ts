import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Utils } from '@/providers';

@Injectable()
export class BaseService<T> {
  constructor(private readonly repo: Repository<T>) {}

  getTimestamp(date?: string) {
    return Utils.getTimestamp(date);
  }

  asset(condition, errorMsg = '参数错误') {
    if (!condition) {
      throw new HttpException(errorMsg, HttpStatus.CONFLICT);
    }
  }

  async ensureNotExist(where, errorMsg = '资源已存在') {
    const existed = await this.repo.count({ where });
    if (existed > 0) {
      throw new HttpException(errorMsg, HttpStatus.CONFLICT);
    }
  }

  async ensureExist(where, errorMsg = '资源不存在') {
    const existed = await this.repo.findOne({ where });
    if (!existed) {
      throw new HttpException(errorMsg, HttpStatus.CONFLICT);
    }
    return existed;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Utils } from '~/core';

@Injectable()
export class BaseService<T> {
  constructor(private readonly repo: Repository<T>) {}

  getTimestamp(date?: string) {
    return Utils.getTimestamp(date);
  }

  asset(condition, invalidMsg = '参数错误') {
    if (!condition) {
      throw new HttpException(invalidMsg, HttpStatus.CONFLICT);
    }
  }

  async ensureNotExist(where, invalidMsg = '资源已存在') {
    const existed = await this.repo.count({ where });
    if (existed > 0) {
      throw new HttpException(invalidMsg, HttpStatus.CONFLICT);
    }
  }

  async ensureExist(where, invalidMsg = '资源不存在') {
    const existed = await this.repo.findOne({ where });
    if (!existed) {
      throw new HttpException(invalidMsg, HttpStatus.CONFLICT);
    }
    return existed;
  }
}

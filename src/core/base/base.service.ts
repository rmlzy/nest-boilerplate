import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Utils } from '~/core';

interface BaseEntity {
  id: number;
}

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
      throw new HttpException(invalidMsg, HttpStatus.NOT_FOUND);
    }
    return existed;
  }

  async getValidIds(ids: number[]): Promise<number[]> {
    const rows = await this.repo.find({ where: { id: In(ids) } });
    return rows.map((item) => item['id']).filter(Boolean);
  }
}

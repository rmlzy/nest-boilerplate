import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService, Utils } from '~/core';
import { CreateAccessDto, UpdateAccessDto } from './dto';
import { AccessEntity } from './entities/access.entity';
import { CreateAccessVo, FindAccessVo, PaginateAccessVo } from './vo';

@Injectable()
export class AccessService extends BaseService<AccessEntity> {
  constructor(
    @InjectRepository(AccessEntity)
    private accessRepo: Repository<AccessEntity>,
  ) {
    super(accessRepo);
  }

  async create(dto: CreateAccessDto): Promise<CreateAccessVo> {
    const { name } = dto;
    await this.ensureNotExist({ name }, '资源名已存在');
    const access = await this.accessRepo.save(dto);
    return Utils.docToVo(access, CreateAccessVo);
  }

  async paginate(): Promise<PaginateAccessVo[]> {
    const accesses = await this.accessRepo.find();
    return Utils.docsToVo(accesses, PaginateAccessVo);
  }

  async findOne(id: number): Promise<FindAccessVo> {
    this.asset(!isNaN(id), '参数不合法');
    const access = await this.ensureExist({ id }, '资源不存在');
    return Utils.docToVo(access, FindAccessVo);
  }

  async update(id: number, dto: UpdateAccessDto): Promise<void> {
    this.asset(!isNaN(id), '参数不合法');
    await this.ensureExist({ id }, '资源不存在');
    await this.accessRepo.update({ id }, dto);
  }

  async remove(id: number): Promise<void> {
    this.asset(!isNaN(id), '参数不合法');
    await this.ensureExist({ id }, '资源不存在');
    await this.accessRepo.delete({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageResp, Utils } from '~/core';
import { CreateAccessDto, UpdateAccessDto } from './access.dto';
import { AccessEntity } from './access.entity';
import { CreateAccessVo, FindAccessVo, PageAccessVo } from './access.vo';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(AccessEntity)
    private accessRepo: Repository<AccessEntity>,
  ) {}

  async create(dto: CreateAccessDto): Promise<CreateAccessVo> {
    const { name } = dto;

    const nameCount = await this.accessRepo.count({ name });
    Utils.assert(nameCount === 0, '资源名已存在');

    const access = await this.accessRepo.save(dto);
    return Utils.docToVo(access, CreateAccessVo);
  }

  async paginate({ skip, take }): Promise<PageResp<PageAccessVo>> {
    const [items, total] = await this.accessRepo.findAndCount({
      skip,
      take,
    });
    return { total, items: Utils.docsToVo(items, PageAccessVo) };
  }

  async findOne(id: number): Promise<FindAccessVo> {
    const access = await this.accessRepo.findOne({ id });
    Utils.assert(access, '资源不存在');

    return Utils.docToVo(access, FindAccessVo);
  }

  async update(id: number, dto: UpdateAccessDto): Promise<void> {
    const access = await this.accessRepo.findOne({ id });
    Utils.assert(access, '资源不存在');

    await this.accessRepo.update({ id }, dto);
  }

  async remove(id: number): Promise<void> {
    const access = await this.accessRepo.findOne({ id });
    Utils.assert(access, '资源不存在');

    await this.accessRepo.delete({ id });
  }

  async getValidIds(ids) {
    // TODO: 过滤掉无效的ID
    return ids;
  }
}

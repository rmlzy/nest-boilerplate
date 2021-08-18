import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '~/core';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { AccessEntity } from './entities/access.entity';
import { AccessBaseVo } from './vo/access.vo';
import { CreateAccessVo } from './vo/create-access.vo';

@Injectable()
export class AccessService extends BaseService<AccessEntity> {
  constructor(
    @InjectRepository(AccessEntity)
    private accessRepo: Repository<AccessEntity>,
  ) {
    super(accessRepo);
  }

  async create(createAccessDto: CreateAccessDto): Promise<CreateAccessVo> {
    const { name } = createAccessDto;
    await this.ensureNotExist({ name }, '资源名已存在');
    const access = await this.accessRepo.save(createAccessDto);
    return access.toVo(CreateAccessVo);
  }

  async findAll(): Promise<AccessBaseVo[]> {
    const accesses = await this.accessRepo.find();
    return accesses.map((access) => access.toVo(CreateAccessVo));
  }

  async findOne(id: number): Promise<AccessBaseVo> {
    const access = await this.ensureExist({ id }, '资源不存在');
    return access.toVo(CreateAccessVo);
  }

  async update(id: number, updateAccessDto: UpdateAccessDto): Promise<void> {
    await this.ensureExist({ id }, '资源不存在');
    await this.accessRepo.update({ id }, updateAccessDto);
  }

  async remove(id: number): Promise<void> {
    await this.ensureExist({ id }, '资源不存在');
    await this.accessRepo.delete({ id });
  }
}

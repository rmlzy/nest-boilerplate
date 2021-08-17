import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '~/core';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { AccessEntity } from './entities/access.entity';

@Injectable()
export class AccessService extends BaseService<AccessEntity> {
  constructor(
    @InjectRepository(AccessEntity)
    private accessRepo: Repository<AccessEntity>,
  ) {
    super(accessRepo);
  }

  async create(createAccessDto: CreateAccessDto): Promise<AccessEntity> {
    const { name } = createAccessDto;
    await this.ensureNotExist({ name }, '资源名已存在');
    return this.accessRepo.save(createAccessDto);
  }

  async findAll(): Promise<AccessEntity[]> {
    return this.accessRepo.find();
  }

  async findOne(id: number): Promise<AccessEntity> {
    return this.ensureExist({ id }, '资源不存在');
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

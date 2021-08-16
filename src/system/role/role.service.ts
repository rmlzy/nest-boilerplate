import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@/core';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
  ) {
    super(roleRepo);
  }

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const { name } = createRoleDto;
    await this.ensureNotExist({ name }, '角色名已存在');
    return this.roleRepo.save(createRoleDto);
  }

  async findAll(): Promise<RoleEntity[]> {
    return this.roleRepo.find();
  }

  async findOne(id: string): Promise<RoleEntity> {
    return this.ensureExist({ id }, '角色不存在');
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<void> {
    await this.ensureExist({ id }, '角色不存在');
    await this.roleRepo.update({ id }, updateRoleDto);
  }

  async remove(id: string): Promise<void> {
    await this.ensureExist({ id }, '角色不存在');
    await this.roleRepo.delete({ id });
  }
}

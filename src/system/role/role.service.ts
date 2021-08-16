import { getConnection, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@/core';
import { AccessService } from '@/system/access/access.service';
import { RoleAccessEntity } from '@/system/role-access/entities/role-access.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
    private accessService: AccessService,
  ) {
    super(roleRepo);
  }

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const { name, accessIds } = createRoleDto;
    await this.ensureNotExist({ name }, '角色名已存在');
    const availableAccessIds = await this.accessService.getAvailableAccessIds(
      accessIds,
    );
    if (availableAccessIds.length === 0) {
      throw new HttpException('未检测到可用的 accessId', HttpStatus.CONFLICT);
    }
    let createdRole;
    await getConnection().transaction(async (manager) => {
      createdRole = await manager.save(RoleEntity, createRoleDto);
      const entities = availableAccessIds.map((accessId) => ({
        accessId,
        roleId: createdRole.id,
      }));
      await manager.save(RoleAccessEntity, entities);
    });
    return createdRole;
  }

  async findAll(): Promise<RoleEntity[]> {
    return this.roleRepo.find();
  }

  async findOne(id: number): Promise<RoleEntity> {
    return this.ensureExist({ id }, '角色不存在');
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<void> {
    await this.ensureExist({ id }, '角色不存在');
    await this.roleRepo.update({ id }, updateRoleDto);
  }

  async remove(id: number): Promise<void> {
    await this.ensureExist({ id }, '角色不存在');
    await this.roleRepo.delete({ id });
  }
}

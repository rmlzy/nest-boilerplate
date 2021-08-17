import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, Transaction, TransactionManager } from 'typeorm';
import { BaseService } from '~/core';
import { AccessService } from '~/system/access/access.service';
import { AccessEntity } from '~/system/access/entities/access.entity';
import { RoleAccessEntity } from '~/system/role-access/entities/role-access.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { RoleVo } from './vo/role.vo';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
    private accessService: AccessService,
  ) {
    super(roleRepo);
  }

  @Transaction()
  async create(createRoleDto: CreateRoleDto, @TransactionManager() manager: EntityManager = null): Promise<RoleEntity> {
    const { name, accessIds } = createRoleDto;
    await this.ensureNotExist({ name }, '角色名已存在');

    const _accessIds = await this.accessService.getValidIds(accessIds);
    await this.asset(_accessIds.length, '未检测到可用的 accessId');

    const createdRole = await manager.save(RoleEntity, createRoleDto);
    const roleAccessEntities = _accessIds.map((accessId) => ({
      accessId,
      roleId: createdRole.id,
    }));
    await manager.save(RoleAccessEntity, roleAccessEntities);
    return createdRole;
  }

  async findAll(): Promise<RoleEntity[]> {
    return this.roleRepo.find();
  }

  async findOne(id: number): Promise<RoleVo> {
    const role = (await this.ensureExist({ id }, '角色不存在')) as RoleVo;
    role.accesses = await this.roleRepo
      .createQueryBuilder('role')
      .leftJoinAndSelect(RoleAccessEntity, 'roleAccess', 'roleAccess.roleId = role.id')
      .leftJoinAndSelect(AccessEntity, 'access', 'roleAccess.accessId = access.id')
      .select(`access.id, access.name`)
      .where('role.id = :id', { id })
      .printSql()
      .execute();
    return role;
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

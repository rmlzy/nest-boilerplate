import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import {
  EntityManager,
  Repository,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { Utils } from '~/core';
import { AccessService } from '~/system/access/access.service';
import { AccessEntity } from '~/system/access/entities/access.entity';
import { RoleAccessEntity } from '~/system/role-access/entities/role-access.entity';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleVo, FindRoleVo, PaginateRoleVo } from './vo';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
    private accessService: AccessService,
  ) {}

  @Transaction()
  async create(
    dto: CreateRoleDto,
    @TransactionManager() manager: EntityManager = null,
  ): Promise<CreateRoleVo> {
    const { name, accessIds } = dto;

    const usernameCount = await this.roleRepo.count({ name });
    Utils.assert(usernameCount === 0, '角色已存在');

    const _accessIds = await this.accessService.getValidIds(accessIds);
    Utils.assert(_accessIds.length > 0, '未检测到可用的 accessId');

    const createdRole = await manager.save(RoleEntity, dto);
    const roleAccessEntities = _accessIds.map((accessId) => ({
      accessId,
      roleId: createdRole.id,
    }));
    await manager.save(RoleAccessEntity, roleAccessEntities);
    return { id: createdRole.id };
  }

  async paginate(): Promise<PaginateRoleVo[]> {
    const roles = await this.roleRepo.find();
    return Utils.docsToVo(roles, PaginateRoleVo);
  }

  async findOne(id: number): Promise<FindRoleVo> {
    const role = await this.roleRepo.find({ id });
    Utils.assert(role, '角色不存在');

    const vo = Utils.docToVo<FindRoleVo>(role, FindRoleVo);
    vo.accesses = await this.roleRepo
      .createQueryBuilder('role')
      .leftJoinAndSelect(
        RoleAccessEntity,
        'roleAccess',
        'roleAccess.roleId = role.id',
      )
      .leftJoinAndSelect(
        AccessEntity,
        'access',
        'roleAccess.accessId = access.id',
      )
      .select(`access.id, access.name`)
      .where('role.id = :id', { id })
      .printSql()
      .execute();
    return vo;
  }

  @Transaction()
  async update(
    id: number,
    dto: UpdateRoleDto,
    @TransactionManager() manager: EntityManager = null,
  ): Promise<void> {
    const roleCount = await this.roleRepo.count({ id });
    Utils.assert(roleCount, '角色不存在');

    const { accessIds = [] } = dto;
    if (accessIds.length) {
      const _accessIds = await this.accessService.getValidIds(accessIds);
      await manager.delete(RoleAccessEntity, { roleId: id });
      const roleAccessEntities = _accessIds.map((accessId) => ({
        accessId,
        roleId: id,
      }));
      await manager.save(RoleAccessEntity, roleAccessEntities);
    }
    await manager.update(RoleEntity, { id }, _.omit(dto, ['accessIds']));
  }

  @Transaction()
  async remove(
    id: number,
    @TransactionManager() manager: EntityManager = null,
  ): Promise<void> {
    const roleCount = await this.roleRepo.count({ id });
    Utils.assert(roleCount, '角色不存在');

    await manager.delete(RoleEntity, { id });
    await manager.delete(RoleAccessEntity, { roleId: id });
  }

  async getValidIds(ids) {
    return ids;
  }
}

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@/core';
import { AccessService } from '@/system/access/access.service';
import { AccessEntity } from '@/system/access/entities/access.entity';
import { RoleAccessEntity } from './entities/role-access.entity';

@Injectable()
export class RoleAccessService extends BaseService<RoleAccessEntity> {
  constructor(
    @InjectRepository(RoleAccessEntity)
    private roleAccessRepo: Repository<RoleAccessEntity>,
    private accessService: AccessService,
  ) {
    super(roleAccessRepo);
  }

  async findAccessByRoleId(id: number): Promise<AccessEntity[]> {
    const relations = await this.roleAccessRepo.find({
      where: { roleId: id },
    });
    const accessIds = relations.map((item) => item.accessId);
    return this.accessService.findByIds(accessIds);
  }
}

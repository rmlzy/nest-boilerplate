import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityManager,
  Repository,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { Utils } from '~/core';
import { RoleEntity } from '~/system/role/entities/role.entity';
import { RoleService } from '~/system/role/role.service';
import { UserRoleEntity } from '~/system/user-role/entities/user-role.entity';
import { CreateUserDto } from './dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserVo, FindUserVo, PaginateUserVo } from './vo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private roleService: RoleService,
  ) {}

  @Transaction()
  async create(
    dto: CreateUserDto,
    @TransactionManager() manager: EntityManager = null,
  ): Promise<CreateUserVo> {
    const { username, realname, email, roleIds } = dto;

    const usernameCount = await this.userRepo.count({ username });
    Utils.assert(usernameCount === 0, '用户名已存在');

    const emailCount = await this.userRepo.count({ email });
    Utils.assert(emailCount === 0, '电子邮箱地址已存在');

    // 默认取 username 作为 realname
    dto.realname = realname || username;
    const createdUser = await manager.save(UserEntity, dto);
    const _roleIds = await this.roleService.getValidIds(roleIds);
    const userRoleEntities = _roleIds.map((roleId) => ({
      roleId,
      userId: createdUser.id,
    }));
    await manager.save(UserRoleEntity, userRoleEntities);
    return { id: createdUser.id };
  }

  async paginate(): Promise<PaginateUserVo[]> {
    const users = await this.userRepo.find();
    Utils.assert(users, '用户不存在');

    return Utils.docsToVo(users, PaginateUserVo);
  }

  async findOne(id: number): Promise<FindUserVo> {
    // TODO: 查询用户的 accessIds
    const user = await this.userRepo.findOne({ id });
    const vo = Utils.docToVo<FindUserVo>(user, FindUserVo);
    vo.roles = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        UserRoleEntity,
        'userRole',
        'userRole.userId = user.id',
      )
      .leftJoinAndSelect(RoleEntity, 'role', 'userRole.roleId = role.id')
      .select(`role.id, role.name`)
      .where('user.id = :id', { id })
      .printSql()
      .execute();
    return vo;
  }

  async findByUsername(username: string): Promise<FindUserVo> {
    const user = await this.userRepo.findOne({ username });
    Utils.assert(user, '用户不存在');

    return Utils.docToVo(user, FindUserVo);
  }

  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where({ username })
      .addSelect('user.password')
      .getOne();
    if (!user) {
      return false;
    }
    return Utils.validatePassword(password, user.password);
  }

  async profile(id: number): Promise<FindUserVo> {
    const user = await this.userRepo.findOne({ id });
    Utils.assert(user, '用户不存在');

    return Utils.docToVo(user, FindUserVo);
  }
}

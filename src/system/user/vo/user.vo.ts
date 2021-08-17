import { UserEntity } from '../entities/user.entity';

export class RoleVo {
  id: number;
  name: number;
}

export class CreateUserVo {
  id: number;
}

export class UserVo extends UserEntity {
  roles: RoleVo[];
}

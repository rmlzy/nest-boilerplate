import { RoleEntity } from '../entities/role.entity';

export class AccessVo {
  id: number;
  name: string;
}

export class RoleVo extends RoleEntity {
  accesses: AccessVo[];
}

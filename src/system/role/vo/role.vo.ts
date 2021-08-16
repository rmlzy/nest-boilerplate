class AccessVo {
  id: number;
  name: string;
}

export class RoleVo {
  id: number;

  name: string;

  description: string;

  accessList: AccessVo[];

  createdAt: Date;

  updatedAt: Date;
}

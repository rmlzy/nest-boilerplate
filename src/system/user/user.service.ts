import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService, Utils } from '~/core';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {
    super(userRepo);
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, realname, email, password } = createUserDto;
    await this.ensureNotExist({ username }, '用户名已存在');
    await this.ensureNotExist({ email }, '电子邮箱地址已存在');
    return this.userRepo.save({
      username,
      realname: realname || username,
      email,
      password,
    });
  }

  async paginate(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.ensureExist({ id }, '用户不存在');
  }

  async findByUsername(username: string): Promise<void | UserEntity> {
    const user = await this.ensureExist({ username }, '用户不存在');
    return user;
  }

  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = await this.userRepo.createQueryBuilder().where({ username }).addSelect('UserEntity.password').getOne();
    if (!user) {
      return false;
    }
    return Utils.validatePassword(password, user.password);
  }
}

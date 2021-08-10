import { Injectable } from '@nestjs/common';
import { BaseService } from '@/core';
import { Utils } from '@/providers';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(private readonly userRepo: UserRepository) {
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

  async findAll(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.ensureExist({ id }, '用户不存在');
  }

  async findByToken(token: string): Promise<UserEntity> {
    this.asset(token, '未检测到认证信息');
    return this.ensureExist({ token }, '用户不存在');
  }

  async findByUsername(username: string): Promise<void | UserEntity> {
    const user = await this.ensureExist({ username }, '用户不存在');
    return user;
  }

  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = await this.userRepo
      .createQueryBuilder()
      .where({ username })
      .addSelect('UserEntity.password')
      .getOne();
    if (!user) {
      return false;
    }
    const valid = await Utils.validatePassword(password, user.password);
    return valid;
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    await this.ensureExist({ id }, '用户不存在');
    await this.userRepo.update({ id }, { password: newPassword });
  }

  async removeToken(id): Promise<void> {
    await this.ensureExist({ id }, '用户不存在');
    await this.userRepo.update({ id }, { token: '' });
  }

  async setToken(id: string, token: string): Promise<void> {
    await this.ensureExist({ id }, '用户不存在');
    await this.userRepo.update(
      { id },
      { token, loggedAt: new Date().toISOString() },
    );
  }
}

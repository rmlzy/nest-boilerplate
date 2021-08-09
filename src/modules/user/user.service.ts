import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@/core';
import { generateHashedPassword } from '@/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {
    super(userRepo);
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const { username, realname, email, password } = createUserDto;
    await this.ensureNotExist({ username }, '用户名已存在');
    await this.ensureNotExist({ email }, '电子邮箱地址已存在');
    await this.userRepo.save({
      username,
      realname: realname || username,
      email,
      password,
      created: this.getTimestamp(),
    });
    return null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepo.find();
    return users;
  }

  async findOne(id: number | string): Promise<void | UserEntity> {
    const user = await this.ensureExist({ id: +id }, '用户不存在');
    return user;
  }

  async findByToken(token: string): Promise<void | UserEntity> {
    this.asset(token, '未检测到认证信息');
    const user = await this.ensureExist({ token }, '用户不存在');
    return user;
  }

  async verifyPassword(
    username: string,
    password: string,
  ): Promise<void | UserEntity> {
    const hashedPassword = generateHashedPassword(password);
    const user = await this.userRepo.findOne({
      username,
      password: hashedPassword,
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    // TODO
    return null;
  }

  async remove(id: number): Promise<void> {
    await this.ensureExist({ id }, '用户不存在');
    await this.userRepo.delete({ id });
    return null;
  }

  async removeToken(id): Promise<void> {
    await this.ensureExist({ id }, '用户不存在');
    await this.userRepo.update({ id }, { token: '' });
  }

  async setToken(id: number, token: string): Promise<void> {
    await this.ensureExist({ id }, '用户不存在');
    await this.userRepo.update({ id }, { token, logged: this.getTimestamp() });
  }
}

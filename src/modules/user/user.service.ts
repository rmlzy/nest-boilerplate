import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@/core';
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

  async create(createUserDto: CreateUserDto) {
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

  async findAll() {
    const users = await this.userRepo.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.ensureExist({ id }, '用户不存在');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // TODO
    return null;
  }

  async remove(id: number) {
    await this.ensureExist({ id }, '用户不存在');
    await this.userRepo.delete({ id });
    return null;
  }
}

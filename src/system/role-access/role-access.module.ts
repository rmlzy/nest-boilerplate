import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleAccessEntity } from './entities/role-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleAccessEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RoleAccessModule {}

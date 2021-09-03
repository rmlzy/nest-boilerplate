import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleAccessEntity } from './role-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleAccessEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RoleAccessModule {}

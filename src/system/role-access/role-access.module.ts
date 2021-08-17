import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from '~/system/access/access.module';
import { RoleAccessEntity } from './entities/role-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleAccessEntity]), AccessModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RoleAccessModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from '~/system/access/access.module';
import { RoleAccessEntity } from './entities/role-access.entity';
import { RoleAccessService } from './role-access.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleAccessEntity]), AccessModule],
  controllers: [],
  providers: [RoleAccessService],
  exports: [RoleAccessService],
})
export class RoleAccessModule {}

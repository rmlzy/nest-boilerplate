import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleAccessService } from './role-access.service';
import { RoleAccessEntity } from './entities/role-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleAccessEntity])],
  controllers: [],
  providers: [RoleAccessService],
})
export class RoleAccessModule {}

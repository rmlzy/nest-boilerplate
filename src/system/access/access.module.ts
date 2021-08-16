import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { AccessEntity } from './entities/access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessEntity])],
  controllers: [AccessController],
  providers: [AccessService],
  exports: [AccessService],
})
export class AccessModule {}

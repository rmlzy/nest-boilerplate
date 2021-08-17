import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserArticleRepository } from './entities/user-article.repository';
import { UserArticleService } from './user-article.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserArticleRepository])],
  controllers: [],
  providers: [UserArticleService],
  exports: [UserArticleService],
})
export class UserArticleModule {}

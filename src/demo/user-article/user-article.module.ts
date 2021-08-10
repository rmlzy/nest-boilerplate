import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserArticleService } from './user-article.service';
import { UserArticleRepository } from './entities/user-article.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserArticleRepository])],
  controllers: [],
  providers: [UserArticleService],
  exports: [UserArticleService],
})
export class UserArticleModule {}

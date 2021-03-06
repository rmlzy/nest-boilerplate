import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserArticleModule } from '~/demo/user-article/user-article.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from './entities/article.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository]), UserArticleModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}

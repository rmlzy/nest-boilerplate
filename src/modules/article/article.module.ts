import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './entities/article.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository])],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}

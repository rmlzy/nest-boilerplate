import { Injectable } from '@nestjs/common';
import { Not, getConnection } from 'typeorm';
import { BaseService } from '@/core';
import { UserArticleService } from '@/demo/user-article/user-article.service';
import { UserArticleEntity } from '@/demo/user-article/entities/user-article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { ArticleRepository } from './entities/article.repository';

@Injectable()
export class ArticleService extends BaseService<ArticleEntity> {
  constructor(
    private readonly articleRepo: ArticleRepository,
    private readonly userArticleService: UserArticleService,
  ) {
    super(articleRepo);
  }

  async create(
    userId: string,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const { title } = createArticleDto;
    await this.ensureNotExist({ title }, '文章标题已存在');
    let createdArticle;
    await getConnection().transaction(async (manager) => {
      createdArticle = await manager.save(ArticleEntity, createArticleDto);
      await manager.save(UserArticleEntity, [
        { userId, articleId: createdArticle.id },
      ]);
    });
    return createdArticle;
  }

  async findOne(id: string): Promise<ArticleEntity> {
    return this.ensureExist({ id }, '文章不存在');
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<void> {
    const { title } = updateArticleDto;
    await this.ensureExist({ id }, '文章不存在');
    await this.ensureNotExist({ title, id: Not(id) }, '文章标题已存在');
    await this.articleRepo.update({ id }, updateArticleDto);
  }

  async remove(userId: string, articleId: string): Promise<void> {
    const exist = await this.userArticleService.exist(userId, articleId);
    this.asset(exist, '文章不存在');
    await getConnection().transaction(async (manager) => {
      await manager.delete(ArticleEntity, { id: articleId });
      await manager.delete(UserArticleEntity, { userId, articleId });
    });
  }
}

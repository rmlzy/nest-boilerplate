import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Utils } from '~/core';
import { UserArticleEntity } from '~/demo/user-article/entities/user-article.entity';
import { UserArticleService } from '~/demo/user-article/user-article.service';
import { CreateArticleDto, UpdateArticleDto } from './article.dto';
import { ArticleEntity } from './entities/article.entity';
import { ArticleRepository } from './entities/article.repository';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepo: ArticleRepository,
    private readonly userArticleService: UserArticleService,
  ) {}

  async create(
    userId: number,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const { title } = createArticleDto;

    const titleCount = await this.articleRepo.count({ title });
    Utils.assert(titleCount === 0, '文章标题已存在');

    let createdArticle;
    await getConnection().transaction(async (manager) => {
      createdArticle = await manager.save(ArticleEntity, createArticleDto);
      await manager.save(UserArticleEntity, [
        { userId, articleId: createdArticle.id },
      ]);
    });
    return createdArticle;
  }

  async findOne(id: number): Promise<ArticleEntity> {
    const article = await this.articleRepo.findOne({ id });
    Utils.assert(article, '文章不存在');

    return article;
  }

  async update(id: number, dto: UpdateArticleDto): Promise<void> {
    const { title } = dto;
    const article = await this.articleRepo.findOne({ title });
    Utils.assert(article, '文章不存在');

    // TODO: 标题不能重复
    const titleCount = await this.articleRepo.count({ title });
    Utils.assert(titleCount === 0, '文章标题已存在');

    await this.articleRepo.update({ id }, dto);
  }

  async remove(userId: number, articleId: number): Promise<void> {
    // TODO: 判断 articleId 是否属于 userId
    await getConnection().transaction(async (manager) => {
      await manager.delete(ArticleEntity, { id: articleId });
      await manager.delete(UserArticleEntity, { userId, articleId });
    });
  }
}

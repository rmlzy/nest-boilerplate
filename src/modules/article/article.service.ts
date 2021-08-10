import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { BaseService } from '@/core';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { ArticleRepository } from './entities/article.repository';

@Injectable()
export class ArticleService extends BaseService<ArticleEntity> {
  constructor(private readonly articleRepo: ArticleRepository) {
    super(articleRepo);
  }

  async create(createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
    const { title } = createArticleDto;
    await this.ensureNotExist({ title }, '文章标题已存在');
    return this.articleRepo.save(createArticleDto);
  }

  async findAll(): Promise<ArticleEntity[]> {
    return this.articleRepo.find();
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

  async remove(id: string): Promise<void> {
    await this.ensureExist({ id }, '文章不存在');
    await this.articleRepo.delete({ id });
  }
}

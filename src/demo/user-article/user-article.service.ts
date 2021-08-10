import { Injectable } from '@nestjs/common';
import { BaseService } from '@/core';
import { UserArticleEntity } from './entities/user-article.entity';
import { UserArticleRepository } from './entities/user-article.repository';

@Injectable()
export class UserArticleService extends BaseService<UserArticleEntity> {
  constructor(private readonly userArticleRepo: UserArticleRepository) {
    super(userArticleRepo);
  }

  async findArticlesByUserId(userId: string) {
    console.log(userId);
  }

  async findUserByArticleId(articleId: string) {}

  async exist(userId: string, articleId: string): Promise<boolean> {
    const count = await this.userArticleRepo.count({
      where: { userId, articleId },
    });
    return count > 0;
  }
}

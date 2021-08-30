import { Injectable } from '@nestjs/common';
import { UserArticleRepository } from './entities/user-article.repository';

@Injectable()
export class UserArticleService {
  constructor(private readonly userArticleRepo: UserArticleRepository) {}

  async findArticlesByUserId(userId: string) {
    console.log(userId);
  }

  async findUserByArticleId(articleId: string) {}

  async exist(userId: number, articleId: number): Promise<boolean> {
    const count = await this.userArticleRepo.count({
      where: { userId, articleId },
    });
    return count > 0;
  }
}

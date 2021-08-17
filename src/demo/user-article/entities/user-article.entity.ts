import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~/core';

@Entity({ name: 'demo_user_article' })
export class UserArticleEntity extends BaseEntity {
  @Column({ comment: '用户ID' })
  userId: number;

  @Column({ comment: '文章ID' })
  articleId: number;
}

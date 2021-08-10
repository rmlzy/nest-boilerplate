import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/core';

@Entity({ name: 'demo_user_article' })
export class UserArticleEntity extends BaseEntity {
  @Column({ comment: '用户ID' })
  userId: string;

  @Column({ comment: '文章ID' })
  articleId: string;
}

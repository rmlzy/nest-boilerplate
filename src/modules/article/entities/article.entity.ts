import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/core';

@Entity({ name: 'article' })
export class ArticleEntity extends BaseEntity {
  @Column({ comment: '标题' })
  title: string;

  @Column({ comment: '正文' })
  content: string;
}

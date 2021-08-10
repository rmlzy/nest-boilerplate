import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ArticleEntity } from './article.entity';

@EntityRepository(ArticleEntity)
export class ArticleRepository extends Repository<ArticleEntity> {}

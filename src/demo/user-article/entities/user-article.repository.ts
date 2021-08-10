import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { UserArticleEntity } from './user-article.entity';

@EntityRepository(UserArticleEntity)
export class UserArticleRepository extends Repository<UserArticleEntity> {}

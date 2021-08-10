import { Test, TestingModule } from '@nestjs/testing';
import { UserArticleService } from './user-article.service';

describe('UserArticleService', () => {
  let service: UserArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserArticleService],
    }).compile();

    service = module.get<UserArticleService>(UserArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

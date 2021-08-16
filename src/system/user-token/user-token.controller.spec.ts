import { Test, TestingModule } from '@nestjs/testing';
import { UserTokenController } from './user-token.controller';
import { UserTokenService } from './user-token.service';

describe('UserTokenController', () => {
  let controller: UserTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTokenController],
      providers: [UserTokenService],
    }).compile();

    controller = module.get<UserTokenController>(UserTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

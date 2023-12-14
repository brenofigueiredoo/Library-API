import { Test, TestingModule } from '@nestjs/testing';
import { UserBookManagerController } from './user_book_manager.controller';
import { UserBookManagerService } from './user_book_manager.service';

describe('UserBookManagerController', () => {
  let controller: UserBookManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBookManagerController],
      providers: [UserBookManagerService],
    }).compile();

    controller = module.get<UserBookManagerController>(UserBookManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

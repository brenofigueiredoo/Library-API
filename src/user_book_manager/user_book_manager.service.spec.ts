import { Test, TestingModule } from '@nestjs/testing';
import { UserBookManagerService } from './user_book_manager.service';

describe('UserBookManagerService', () => {
  let service: UserBookManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBookManagerService],
    }).compile();

    service = module.get<UserBookManagerService>(UserBookManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

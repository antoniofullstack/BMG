import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    const controller = module.get<UsersController>(UsersController);
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    const service = module.get<UsersService>(UsersService);
    expect(service).toBeDefined();
  });
});

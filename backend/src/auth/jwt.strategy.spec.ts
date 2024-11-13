import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './jwt.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UsersService, useValue: { findOne: () => null } },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should validate a user', async () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      portfolios: [],
    };
    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

    const result = await strategy.validate({ sub: '1' });
    expect(result).toEqual(user);
  });

  it('should throw NotFoundException if user does not exist', async () => {
    jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

    await expect(strategy.validate({ sub: '1' })).rejects.toThrow(
      NotFoundException,
    );
  });
});

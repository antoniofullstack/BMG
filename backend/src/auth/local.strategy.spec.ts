import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        AuthService,
        {
          provide: UsersService,
          useValue: { findOne: jest.fn() }, // Mock findOne method
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn() }, // Mock JwtService
        },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should validate a user', async () => {
    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'password',
    };
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user);

    const result = await strategy.validate('test@example.com', 'password');
    expect(result).toEqual(user);
  });

  it('should throw UnauthorizedException if user is not valid', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

    await expect(
      strategy.validate('test@example.com', 'wrongpassword'),
    ).rejects.toThrow(UnauthorizedException);
  });
});

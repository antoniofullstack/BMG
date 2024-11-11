import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto'; // Importe o DTO

const mockUserService = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('validateUser ', () => {
    it('should return user if credentials are valid', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
      };
      mockUserService.findByEmail.mockResolvedValue(user);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );
      expect(result).toEqual({ id: 1, email: 'test@example.com' });
    });

    it('should return null if credentials are invalid', async () => {
      mockUserService.findByEmail.mockResolvedValue(null);

      const result = await authService.validateUser(
        'test@example.com',
        'wrongpassword',
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user info for valid credentials', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
      };
      mockUserService.findByEmail.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('token');

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result).toHaveProperty('access_token');
      expect(result.user).toEqual({ id: 1, email: 'test@example.com' });
    });

    it('should throw NotFoundException for invalid credentials', async () => {
      mockUserService.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      }; // Adicione o campo name
      mockUserService.findByEmail.mockResolvedValue(null);
      mockUserService.create.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
      });

      const result = await authService.register(registerDto);
      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      }; // Adicione o campo name
      mockUserService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
      });

      await expect(authService.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});

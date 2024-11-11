import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return a token on successful login', async () => {
      const loginDto: LoginDto = { email: 'testemail', password: 'testpass' };
      const result = { access_token: 'some-token' };

      mockAuthService.login.mockResolvedValue(result);

      expect(await authController.login(loginDto)).toBe(result);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('register', () => {
    it('should register a user and return a success message', async () => {
      const registerDto: RegisterDto = {
        email: 'newemail',
        password: 'newpass',
        name: 'newname',
      };
      const result = { message: 'User  registered successfully' };

      mockAuthService.register.mockResolvedValue(result);

      expect(await authController.register(registerDto)).toBe(result);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });
});

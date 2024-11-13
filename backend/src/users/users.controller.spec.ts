import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUser: User = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedpassword',
    portfolios: [],
  };

  const mockCreateUserDto: CreateUserDto = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  const mockUpdateUserDto: UpdateUserDto = {
    name: 'Updated User',
    email: 'updated@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findAll: jest.fn().mockResolvedValue([mockUser]),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest
              .fn()
              .mockResolvedValue({ ...mockUser, ...mockUpdateUserDto }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const result = await usersController.create(mockCreateUserDto);

      expect(result).toEqual(mockUser);
      expect(usersService.create).toHaveBeenCalledWith(mockCreateUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await usersController.findAll();

      expect(result).toEqual([mockUser]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by id', async () => {
      const result = await usersController.findOne('1');

      expect(result).toEqual(mockUser);
      expect(usersService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const result = await usersController.update('1', mockUpdateUserDto);

      expect(result).toEqual({
        ...mockUser,
        ...mockUpdateUserDto,
      });
      expect(usersService.update).toHaveBeenCalledWith('1', mockUpdateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await usersController.remove('1');

      expect(result).toBeUndefined();
      expect(usersService.remove).toHaveBeenCalledWith('1');
    });
  });

  // Teste para verificar se o controller está usando o JwtAuthGuard
  it('should have JwtAuthGuard decorator', () => {
    const guardMetadata = Reflect.getMetadata('__guards__', UsersController);
    expect(guardMetadata).toBeDefined();
  });
});

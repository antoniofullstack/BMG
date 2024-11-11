import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockReturnValue(createUserDto as User);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...createUserDto,
        id: '1',
      } as User);

      const result = await service.create(createUserDto);
      expect(result).toEqual({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(createUserDto as User);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: '1', name: 'Test User', email: 'test@example.com' }];

      jest.spyOn(repository, 'find').mockResolvedValue(users as User[]);

      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: '1', name: 'Test User', email: 'test@example.com' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user as User);

      const result = await service.findOne('1');
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user and return updated user', async () => {
      const user = { id: '1', name: 'Test User', email: 'test@example.com' };
      const updateUserDto: UpdateUserDto = { name: 'Updated User' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user as User);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...user,
        ...updateUserDto,
      } as User);

      const result = await service.update('1', updateUserDto);
      expect(result).toEqual({
        id: '1',
        name: 'Updated User',
        email: 'test@example.com',
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated User' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.update('1', updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = { id: '1', name: 'Test User', email: 'test@example.com' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user as User);
      jest.spyOn(repository, 'remove').mockResolvedValue(user as User);

      await expect(service.remove('1')).resolves.not.toThrow();
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const user = { id: '1', name: 'Test User', email: 'test@example.com' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user as User);

      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(user);
    });

    it('should return null if user does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findByEmail('test@example.com');
      expect(result).toBeNull();
    });
  });
});

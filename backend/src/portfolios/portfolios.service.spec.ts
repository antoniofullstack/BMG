import { Test, TestingModule } from '@nestjs/testing';
import { PortfoliosService } from './portfolios.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Portfolio } from './portfolios.entity';
import { NotFoundException } from '@nestjs/common';

describe('PortfolioService', () => {
  let service: PortfoliosService;
  let mockPortfolioRepository;

  beforeEach(async () => {
    mockPortfolioRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfoliosService,
        {
          provide: getRepositoryToken(Portfolio),
          useValue: mockPortfolioRepository,
        },
      ],
    }).compile();

    service = module.get<PortfoliosService>(PortfoliosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of portfolios', async () => {
      const mockPortfolios = [{ id: '1' }, { id: '2' }];
      mockPortfolioRepository.find.mockResolvedValue(mockPortfolios);

      const result = await service.findAll();
      expect(result).toEqual(mockPortfolios);
    });
  });

  describe('findOne', () => {
    it('should return a portfolio when found', async () => {
      const mockPortfolio = { id: '1', name: 'Test Portfolio' };
      mockPortfolioRepository.findOne.mockResolvedValue(mockPortfolio);

      const result = await service.findOne('1');
      expect(result).toEqual(mockPortfolio);
    });

    it('should throw NotFoundException when portfolio not found', async () => {
      mockPortfolioRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return a portfolio', async () => {
      const mockPortfolio = { id: '1', name: 'Old Name' };
      const updateDto = { name: 'New Name' };

      mockPortfolioRepository.findOne.mockResolvedValue(mockPortfolio);
      mockPortfolioRepository.save.mockResolvedValue({
        ...mockPortfolio,
        ...updateDto,
      });

      const result = await service.update('1', updateDto);
      expect(result.name).toBe('New Name');
    });
  });

  describe('remove', () => {
    it('should remove a portfolio', async () => {
      const mockPortfolio = { id: '1' };
      mockPortfolioRepository.findOne.mockResolvedValue(mockPortfolio);
      mockPortfolioRepository.remove.mockResolvedValue(mockPortfolio);

      await service.remove('1');
      expect(mockPortfolioRepository.remove).toHaveBeenCalledWith(
        mockPortfolio,
      );
    });
  });
});

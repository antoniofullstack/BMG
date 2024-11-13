import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentsService } from './investments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Investment } from './investment.entity';
import { Portfolio } from '../portfolios/portfolios.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { CreateInvestmentDto } from './dto/create-investment.dto';

describe('InvestmentsService', () => {
  let service: InvestmentsService;
  let investmentRepository: Repository<Investment>;
  let portfolioRepository: Repository<Portfolio>;

  const mockPortfolio = {
    id: '1',
    name: 'Test Portfolio',
  };

  const mockInvestment = {
    id: '1',
    name: 'Test Investment',
    value: 1000,
    portfolio: mockPortfolio,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentsService,
        {
          provide: getRepositoryToken(Investment),
          useValue: {
            create: jest.fn().mockReturnValue(mockInvestment),
            save: jest.fn().mockResolvedValue(mockInvestment),
            find: jest.fn().mockResolvedValue([mockInvestment]),
            findOne: jest.fn().mockResolvedValue(mockInvestment),
            remove: jest.fn().mockResolvedValue(mockInvestment),
          },
        },
        {
          provide: getRepositoryToken(Portfolio),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockPortfolio),
          },
        },
      ],
    }).compile();

    service = module.get<InvestmentsService>(InvestmentsService);
    investmentRepository = module.get(getRepositoryToken(Investment));
    portfolioRepository = module.get(getRepositoryToken(Portfolio));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an investment', async () => {
      const createDto: CreateInvestmentDto = {
        portfolioId: '1',
        companyName: 'Test Investment',
        value: 1000,
        purchaseDate: new Date(),
      };
      const result = await service.create(createDto);
      expect(result).toEqual(mockInvestment);
    });

    it('should throw BadRequestException if portfolio not found', async () => {
      jest.spyOn(portfolioRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.create({
          portfolioId: 'invalid',
          companyName: 'Test Investment',
          value: 1000,
          purchaseDate: new Date(),
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all investments', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockInvestment]);
    });
  });

  describe('findOne', () => {
    it('should return a single investment', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockInvestment);
    });

    it('should throw NotFoundException if investment not found', async () => {
      jest.spyOn(investmentRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByPortfolio', () => {
    it('should return investments for a portfolio', async () => {
      const result = await service.findByPortfolio('1');
      expect(result).toEqual([mockInvestment]);
    });

    it('should throw NotFoundException if portfolio not found', async () => {
      jest.spyOn(portfolioRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findByPortfolio('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an investment', async () => {
      const updateDto: UpdateInvestmentDto = {
        companyName: 'Updated Investment',
        value: 1000,
      };
      const result = await service.update('1', updateDto);
      expect(result).toEqual(mockInvestment);
    });
  });

  describe('remove', () => {
    it('should remove an investment', async () => {
      await service.remove('1');
      expect(investmentRepository.remove).toHaveBeenCalled();
    });
  });

  describe('calculateTotalInvestmentValue', () => {
    it('should calculate total investment value', async () => {
      const result = await service.calculateTotalInvestmentValue('1');
      expect(result).toBe(1000);
    });

    it('should return 0 if no investments', async () => {
      jest.spyOn(service, 'findByPortfolio').mockResolvedValue([]);

      const result = await service.calculateTotalInvestmentValue('1');
      expect(result).toBe(0);
    });
  });
});

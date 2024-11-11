import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentsService } from './investments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Investment } from './investment.entity';
import { Portfolio } from '../portfolios/portfolios.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

describe('InvestmentsService', () => {
  let service: InvestmentsService;

  const mockInvestmentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
  };

  const mockPortfolioRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestmentsService,
        {
          provide: getRepositoryToken(Investment),
          useValue: mockInvestmentRepository,
        },
        {
          provide: getRepositoryToken(Portfolio),
          useValue: mockPortfolioRepository,
        },
      ],
    }).compile();

    service = module.get<InvestmentsService>(InvestmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new investment', async () => {
    const createInvestmentDto: CreateInvestmentDto = {
      portfolioId: '1',
      companyName: 'Test Company',
      value: 1000,
      purchaseDate: new Date(),
    };
    const portfolio = { id: 1, name: 'Test Portfolio' };
    const investment = { id: 1, ...createInvestmentDto };

    mockPortfolioRepository.findOne.mockResolvedValue(portfolio);
    mockInvestmentRepository.create.mockReturnValue(investment);
    mockInvestmentRepository.save.mockResolvedValue(investment);

    const result = await service.create(createInvestmentDto);
    expect(result).toEqual(investment);
    expect(mockPortfolioRepository.findOne).toHaveBeenCalledWith({
      where: { id: createInvestmentDto.portfolioId },
    });
    expect(mockInvestmentRepository.create).toHaveBeenCalledWith({
      ...createInvestmentDto,
      portfolio: portfolio,
    });
    expect(mockInvestmentRepository.save).toHaveBeenCalledWith(investment);
  });

  it('should throw NotFoundException if portfolio not found', async () => {
    const createInvestmentDto: CreateInvestmentDto = {
      portfolioId: '1',
      companyName: 'Test Company',
      value: 1000,
      purchaseDate: new Date(),
    };

    mockPortfolioRepository.findOne.mockResolvedValue(null);

    await expect(service.create(createInvestmentDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return all investments', async () => {
    const investments = [{ id: 1, amount: 1000 }];

    mockInvestmentRepository.find.mockResolvedValue(investments);

    const result = await service.findAll();
    expect(result).toEqual(investments);
    expect(mockInvestmentRepository.find).toHaveBeenCalled();
  });

  it('should return an investment by ID', async () => {
    const investment = { id: 1, amount: 1000 };

    mockInvestmentRepository.findOne.mockResolvedValue(investment);

    const result = await service.findOne('1');
    expect(result).toEqual(investment);
    expect(mockInvestmentRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['portfolio'],
    });
  });

  it('should throw NotFoundException if investment not found', async () => {
    mockInvestmentRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update an investment', async () => {
    const existingInvestment = { id: '1', value: 1000 };
    const updateDto = { value: 2000 };
    const updatedInvestment = { ...existingInvestment, ...updateDto };

    mockInvestmentRepository.findOne.mockResolvedValue(existingInvestment);
    mockInvestmentRepository.save.mockResolvedValue(updatedInvestment);

    const result = await service.update('1', updateDto);

    expect(result).toEqual(updatedInvestment);
    expect(mockInvestmentRepository.findOne).toHaveBeenCalledWith('1');
    expect(mockInvestmentRepository.save).toHaveBeenCalledWith(
      updatedInvestment,
    );
  });

  it('should throw NotFoundException if investment to update not found', async () => {
    const updateInvestmentDto: UpdateInvestmentDto = { value: 2000 };

    mockInvestmentRepository.preload.mockResolvedValue(null);

    await expect(service.update('1', updateInvestmentDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should remove an investment', async () => {
    const investment = { id: 1, amount: 1000 };
    mockInvestmentRepository.findOne.mockResolvedValue(investment);
    mockInvestmentRepository.delete.mockResolvedValue(investment);

    await expect(service.remove('1')).resolves.not.toThrow();
    expect(mockInvestmentRepository.findOne).toHaveBeenCalledWith('1');
    expect(mockInvestmentRepository.delete).toHaveBeenCalledWith(investment);
  });

  it('should throw NotFoundException if investment to delete not found', async () => {
    mockInvestmentRepository.findOne.mockResolvedValue(null);

    await expect(service.remove('1')).rejects.toThrow(NotFoundException);
  });
});

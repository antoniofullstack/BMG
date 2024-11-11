import { Test, TestingModule } from '@nestjs/testing';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Portfolio } from './portfolios.entity';
import { Repository } from 'typeorm';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

describe('PortfoliosService', () => {
  let service: PortfoliosService;
  let repository: Repository<Portfolio>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [
        PortfoliosService,
        {
          provide: getRepositoryToken(Portfolio),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            // Mock the methods of UsersService that PortfoliosService uses
            findOne: jest.fn(),
            // Add other methods as needed
          },
        },
      ],
    }).compile();

    service = module.get<PortfoliosService>(PortfoliosService);
    repository = module.get<Repository<Portfolio>>(
      getRepositoryToken(Portfolio),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deve criar um novo portfólio com sucesso', async () => {
    const createPortfolioDto: CreatePortfolioDto = {
      name: 'Meu portfólio',
      description: 'Este é o meu portfólio',
      userId: '123456789',
    };

    const portfolio = await service.create(createPortfolioDto);

    expect(portfolio).toBeDefined();
    expect(portfolio.name).toEqual(createPortfolioDto.name);
    expect(portfolio.description).toEqual(createPortfolioDto.description);
    expect(portfolio.user).toBeDefined();
    expect(portfolio.user.id).toEqual(createPortfolioDto.userId);
  });

  it('Deve retorna uma lista de portfólios', async () => {
    const portfolios = await service.findAll();

    expect(portfolios).toBeDefined();
    expect(portfolios).toBeInstanceOf(Array);
    expect(portfolios.length).toBeGreaterThan(0);
  });

  it('Deve retorna um portfólio por ID', async () => {
    const portfolio = await service.findOne('1234567890');

    expect(portfolio).toBeDefined();
    expect(portfolio.name).toBeDefined();
    expect(portfolio.description).toBeDefined();
    expect(portfolio.user).toBeDefined();
    expect(portfolio.user.id).toEqual('1234567890');
  });

  it('Deve retorna um erro se o portfólio não existir', async () => {
    try {
      await service.findOne('1234567890123');
    } catch (error) {
      expect(error).toEqual(new NotFoundException('Portfolio not found'));
    }
  });

  it('Deve atualizar um portfólio com sucesso', async () => {
    const updatePortfolioDto: UpdatePortfolioDto = {
      name: 'Meu portfólio Atualizado',
      description: 'Este é o meu portfólio Atualizado',
    };

    const portfolio = await service.update('1234567890', updatePortfolioDto);

    expect(portfolio).toBeDefined();
    expect(portfolio.name).toEqual(updatePortfolioDto.name);
    expect(portfolio.description).toEqual(updatePortfolioDto.description);
    expect(portfolio.user).toBeDefined();
    expect(portfolio.user.id).toEqual('1234567890');
  });

  it('Deve deletar um portfólio com sucesso', async () => {
    await service.remove('1234567890');

    const portfolio = await service.findOne('1234567890');

    expect(portfolio).toBeNull();
  });
});

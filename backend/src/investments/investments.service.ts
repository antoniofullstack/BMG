import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './investment.entity';
import { Portfolio } from '../portfolios/portfolios.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentsRepository: Repository<Investment>,
    @InjectRepository(Portfolio)
    private portfoliosRepository: Repository<Portfolio>,
  ) {}

  async create(createInvestmentDto: CreateInvestmentDto): Promise<Investment> {
    const portfolio = await this.portfoliosRepository.findOne({
      where: { id: createInvestmentDto.portfolioId },
    });

    if (!portfolio) {
      throw new BadRequestException('Portfolio not found');
    }

    const newInvestment = this.investmentsRepository.create({
      ...createInvestmentDto,
      portfolio: portfolio,
    });

    return this.investmentsRepository.save(newInvestment);
  }

  async findAll(): Promise<Investment[]> {
    return this.investmentsRepository.find({
      relations: ['portfolio'],
    });
  }

  async findOne(id: string): Promise<Investment> {
    const investment = await this.investmentsRepository.findOne({
      where: { id },
      relations: ['portfolio'],
    });

    if (!investment) {
      throw new NotFoundException('Investment not found');
    }

    return investment;
  }

  async findByPortfolio(portfolioId: string): Promise<Investment[]> {
    // Verificar se o portfolio existe
    const portfolio = await this.portfoliosRepository.findOne({
      where: { id: portfolioId },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    return this.investmentsRepository.find({
      where: { portfolio: { id: portfolioId } },
      relations: ['portfolio'],
    });
  }

  async update(
    id: string,
    updateInvestmentDto: UpdateInvestmentDto,
  ): Promise<Investment> {
    const investment = await this.findOne(id);

    Object.assign(investment, updateInvestmentDto);

    return this.investmentsRepository.save(investment);
  }

  async remove(id: string): Promise<void> {
    const investment = await this.findOne(id);

    if (!investment) {
      throw new Error(`Investment with id ${id} not found`);
    }

    await this.investmentsRepository.remove(investment);
  }

  // Método para calcular o valor total de investimentos de um portfólio
  async calculateTotalInvestmentValue(portfolioId: string): Promise<number> {
    const investments = await this.findByPortfolio(portfolioId);

    if (!investments.length) {
      return 0;
    }

    return investments.reduce((total, investment) => {
      return total + Number(investment.value);
    }, 0);
  }
}

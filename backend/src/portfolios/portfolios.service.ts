import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './portfolios.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private portfoliosRepository: Repository<Portfolio>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    const portfolio = this.portfoliosRepository.create(createPortfolioDto);
    return this.portfoliosRepository.save(portfolio);
  }

  async findAll(id: string): Promise<Portfolio[]> {
    return this.portfoliosRepository.find({ where: { user: { id: id } } });
  }

  async findOne(id: string): Promise<Portfolio> {
    const portfolio = await this.portfoliosRepository.findOne({
      where: { id },
    });
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }
    return portfolio;
  }

  async update(
    id: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    const portfolio = await this.findOne(id);
    Object.assign(portfolio, updatePortfolioDto);
    return this.portfoliosRepository.save(portfolio);
  }

  async remove(id: string): Promise<void> {
    const portfolio = await this.findOne(id);
    await this.portfoliosRepository.remove(portfolio);
  }
}

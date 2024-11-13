import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { Investment } from './investment.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('investments')
@UseGuards(JwtAuthGuard)
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  async create(
    @Body() createInvestmentDto: CreateInvestmentDto,
  ): Promise<Investment> {
    return this.investmentsService.create(createInvestmentDto);
  }

  @Get()
  async findAll(): Promise<Investment[]> {
    return this.investmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Investment> {
    return this.investmentsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvestmentDto: UpdateInvestmentDto,
  ): Promise<Investment> {
    return this.investmentsService.update(id, updateInvestmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.investmentsService.remove(id);
  }

  @Get('portfolio/:portfolioId')
  async findByPortfolio(
    @Param('portfolioId') portfolioId: string,
  ): Promise<Investment[]> {
    return this.investmentsService.findByPortfolio(portfolioId);
  }

  @Get('portfolio/:portfolioId/total-value')
  async calculateTotalInvestmentValue(
    @Param('portfolioId') portfolioId: string,
  ): Promise<number> {
    return this.investmentsService.calculateTotalInvestmentValue(portfolioId);
  }
}

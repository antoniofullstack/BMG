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
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './portfolios.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('portfolios')
@UseGuards(JwtAuthGuard)
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  async create(
    @Body() createPortfolioDto: CreatePortfolioDto,
  ): Promise<Portfolio> {
    return this.portfoliosService.create(createPortfolioDto);
  }

  @Get()
  async findAll(): Promise<Portfolio[]> {
    return this.portfoliosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Portfolio> {
    return this.portfoliosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    return this.portfoliosService.update(id, updatePortfolioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.portfoliosService.remove(id);
  }
}

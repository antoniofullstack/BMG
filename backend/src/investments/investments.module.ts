import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentsController } from './investments.controller';
import { InvestmentsService } from './investments.service';
import { Investment } from './investment.entity';
import { Portfolio } from '../portfolios/portfolios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Investment, Portfolio])],
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
  exports: [InvestmentsService],
})
export class InvestmentsModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentsModule } from './investments.module';
import { InvestmentsController } from './investments.controller';

describe('InvestmentsModule', () => {
  let controller: InvestmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InvestmentsModule],
    }).compile();

    controller = module.get<InvestmentsController>(InvestmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

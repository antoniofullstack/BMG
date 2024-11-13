import { Test, TestingModule } from '@nestjs/testing';
import { PortfoliosModule } from './portfolios.module';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';

describe('PortfoliosModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PortfoliosModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have a defined controller', () => {
    const controller = module.get<PortfoliosController>(PortfoliosController);
    expect(controller).toBeDefined();
  });

  it('should have a defined service', () => {
    const service = module.get<PortfoliosService>(PortfoliosService);
    expect(service).toBeDefined();
  });
});

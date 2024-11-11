import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentsController } from './investments.controller';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { Investment } from './investment.entity';

describe('InvestmentsController', () => {
  let controller: InvestmentsController;
  let service: InvestmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentsController],
      providers: [
        {
          provide: InvestmentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByPortfolio: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InvestmentsController>(InvestmentsController);
    service = module.get<InvestmentsService>(InvestmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call InvestmentsService.create', async () => {
      const dto = new CreateInvestmentDto();
      const result = new Investment();
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call InvestmentsService.findAll', async () => {
      const result = [new Investment()];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call InvestmentsService.findOne', async () => {
      const id = 'test-id';
      const result = new Investment();
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('findByPortfolio', () => {
    it('should call InvestmentsService.findByPortfolio', async () => {
      const portfolioId = 'test-portfolio-id';
      const result = [new Investment()];
      jest.spyOn(service, 'findByPortfolio').mockResolvedValue(result);

      expect(await controller.findByPortfolio(portfolioId)).toBe(result);
      expect(service.findByPortfolio).toHaveBeenCalledWith(portfolioId);
    });
  });

  describe('update', () => {
    it('should call InvestmentsService.update', async () => {
      const id = 'test-id';
      const dto = new CreateInvestmentDto();
      const result = new Investment();
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, dto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should call InvestmentsService.remove', async () => {
      const id = 'test-id';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});

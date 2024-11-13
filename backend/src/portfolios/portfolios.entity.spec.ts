import { Portfolio } from './portfolios.entity';
import { User } from '../users/users.entity';
import { Investment } from '../investments/investment.entity';
import { validate } from 'class-validator';

describe('Portfolio Entity', () => {
  let portfolio: Portfolio;
  let user: User;

  beforeEach(() => {
    // Criar um usuário mock
    user = new User();
    user.id = '123e4567-e89b-12d3-a456-426614174000';
    user.name = 'Test User';
    user.email = 'test@example.com';
    user.password = 'hashedpassword';

    // Criar um portfolio mock
    portfolio = new Portfolio();
    portfolio.id = '123e4567-e89b-12d3-a456-426614174000';
    portfolio.name = 'Test Portfolio';
    portfolio.description = 'A test portfolio for investment';
    portfolio.user = user;
  });

  it('should create a portfolio instance', () => {
    expect(portfolio).toBeDefined();
    expect(portfolio).toBeInstanceOf(Portfolio);
  });

  it('should have correct properties', () => {
    expect(portfolio.id).toBeDefined();
    expect(portfolio.name).toBe('Test Portfolio');
    expect(portfolio.description).toBe('A test portfolio for investment');
    expect(portfolio.user).toBe(user);
  });

  it('should validate portfolio with valid data', async () => {
    const errors = await validate(portfolio);
    expect(errors.length).toBe(0);
  });

  it('should require name', async () => {
    portfolio.name = '';
    const errors = await validate(portfolio);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should allow optional description', () => {
    portfolio.description = undefined;
    expect(portfolio.description).toBeUndefined();
  });

  it('should have a relationship with User', () => {
    expect(portfolio.user).toBeInstanceOf(User);
    expect(portfolio.user.id).toBe('123e4567-e89b-12d3-a456-426614174000');
  });

  it('should initialize investments as an empty array', () => {
    portfolio.investments = [];
    expect(portfolio.investments).toHaveLength(0);
  });

  it('should add investments to the portfolio', () => {
    const investment1 = new Investment();
    investment1.id = '123e4567-e89b-12d3-a456-426614174001';
    investment1.companyName = 'Test Company';
    investment1.value = 1000.0;
    investment1.purchaseDate = new Date();
    investment1.portfolio = portfolio;

    portfolio.investments = [investment1];

    expect(portfolio.investments).toHaveLength(1);
    expect(portfolio.investments[0]).toBeInstanceOf(Investment);
    expect(portfolio.investments[0].companyName).toBe('Test Company');
  });

  it('should support multiple investments', () => {
    const investment1 = new Investment();
    investment1.id = '123e4567-e89b-12d3-a456-426614174001';
    investment1.companyName = 'Test Company 1';
    investment1.value = 1000.0;
    investment1.purchaseDate = new Date();
    investment1.portfolio = portfolio;

    const investment2 = new Investment();
    investment2.id = '123e4567-e89b-12d3-a456-426614174002';
    investment2.companyName = 'Test Company 2';
    investment2.value = 2000.0;
    investment2.purchaseDate = new Date();
    investment2.portfolio = portfolio;

    portfolio.investments = [investment1, investment2];

    expect(portfolio.investments).toHaveLength(2);
    expect(portfolio.investments[0].companyName).toBe('Test Company 1');
    expect(portfolio.investments[1].companyName).toBe('Test Company 2');
  });

  it('should have correct type decorators', () => {
    const portfolioMetadata = Reflect.getMetadata(
      'design:type',
      Portfolio.prototype,
      'id',
    );
    expect(portfolioMetadata).toBeDefined();
  });

  it('should handle large descriptions', () => {
    const longDescription = 'A'.repeat(1000);
    portfolio.description = longDescription;
    expect(portfolio.description.length).toBe(1000);
  });

  it('should create portfolio with minimal required data', () => {
    const minimalPortfolio = new Portfolio();
    minimalPortfolio.name = 'Minimal Portfolio';
    minimalPortfolio.user = user;

    expect(minimalPortfolio.name).toBe('Minimal Portfolio');
    expect(minimalPortfolio.description).toBeUndefined();
  });
});

export interface Investment {
  companyName: string;
  value: number | string;
  purchaseDate: Date;
  portfolioId?: string | string[];
}

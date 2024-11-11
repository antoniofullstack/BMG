'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import api from '@/api/api';

const PortfolioDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const { user } = useAuth();
  const [portfolio, setPortfolio] = React.useState<any>(null);

  React.useEffect(() => {
    if (id) {
      const fetchPortfolio = async () => {
        const data = await api.getPortfolio(id);
      };

      fetchPortfolio();
    }
  }, [id]);

  if (!portfolio) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{portfolio.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Render portfolio details */}
        <p>Investments: {portfolio.investments.join(', ')}</p>
      </CardContent>
    </Card>
  );
};

export default PortfolioDetailPage;

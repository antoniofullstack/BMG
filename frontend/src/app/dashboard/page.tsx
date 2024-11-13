'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import api from '@/api/api';

interface Portfolio {
  id: string;
  name: string;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchPortfolios = async () => {
      if (token !== null) {
        const data = await api.getPortfolios(token);
        setPortfolios(data);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <div className="space-y-4">
      {portfolios.map((portfolio) => (
        <Card key={portfolio.id}>
          <CardHeader>
            <CardTitle>{portfolio.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={`/dashboard/${portfolio.id}`}>View Portfolio</Link>
          </CardContent>
          <CardFooter>
            <Link href={`/dashboard/${portfolio.id}/investments`}>
              Manage Investments
            </Link>
          </CardFooter>
        </Card>
      ))}
      <Link href="/dashboard/create">Create New Portfolio</Link>
    </div>
  );
};

export default DashboardPage;

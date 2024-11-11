'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CreateInvestmentPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [investmentName, setInvestmentName] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/portfolios/${id}/investments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: investmentName, amount: investmentAmount }),
    });

    if (response.ok) {
      router.push(`/dashboard/${id}/investments`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Investment Name"
        value={investmentName}
        onChange={(e) => setInvestmentName(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Investment Amount"
        value={investmentAmount}
        onChange={(e) => setInvestmentAmount(e.target.value)}
        required
      />
      <Button type="submit">Add Investment</Button>
    </form>
  );
};

export default CreateInvestmentPage;

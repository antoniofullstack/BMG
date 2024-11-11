"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PortfolioDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [portfolio, setPortfolio] = React.useState<any>(null);

  React.useEffect(() => {
    if (id) {
      // Fetch portfolio details from the API
      const fetchPortfolio = async () => {
        const response = await fetch(`/api/portfolios/${id}`);
        const data = await response.json();
        setPortfolio(data);
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
        <p>Investments: {portfolio.investments.join(", ")}</p>
      </CardContent>
    </Card>
  );
};

export default PortfolioDetailPage;

"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface Portfolio {
  id: string;
  name: string;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = React.useState<Portfolio[]>([]);

  React.useEffect(() => {
    // Fetch portfolios from the API
    const fetchPortfolios = async () => {
      const response = await fetch("/api/portfolios");
      const data = await response.json();
      setPortfolios(data);
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

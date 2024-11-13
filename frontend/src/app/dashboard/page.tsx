"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import api from "@/api/api";
import { Portfolio } from "@/interfaces/Portfolio";
import { Button } from "@/components/ui/button";
import PortfolioModal from "@/components/PortfolioModal";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchPortfolios = async () => {
      if (token !== null) {
        const data = await api.getPortfolios(user?.id, token);
        setPortfolios(data);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <div className="container mx-auto py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Button variant="default" onClick={() => setIsModalOpen(true)}>
        Criar Novo Portfolio
      </Button>

      {portfolios.map((portfolio) => (
        <Card
          key={portfolio.id}
          className="h-64 transition-transform duration-200 transform hover:scale-105  flex flex-col"
        >
          <CardHeader>
            <CardTitle>{portfolio.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="italic text-gray-600 line-clamp-3">
              {portfolio.description}
            </p>
            <Link
              href={`/dashboard/${portfolio.id}`}
              className="text-blue-600 transition-colors duration-200 truncate"
            >
              Ver Portfolio
            </Link>
          </CardContent>
          <CardFooter>
            <Link
              href={`/dashboard/${portfolio.id}/investments`}
              className="text-blue-600 transition-colors duration-200 truncate"
            >
              Gerenciar Investimentos
            </Link>
          </CardFooter>
        </Card>
      ))}
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;

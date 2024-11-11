"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import api from "@/api/api";

const InvestmentsPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const { user } = useAuth();
  const [investments, setInvestments] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (id) {
      const fetchInvestments = async () => {
        const data = await api.getInvestments();
        setInvestments(data);
      };

      fetchInvestments();
    }
  }, [id]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Investments</CardTitle>
        </CardHeader>
        <CardContent>
          {investments.length > 0 ? (
            investments.map((investment) => (
              <div key={investment.id}>
                <p>
                  {investment.name}: {investment.amount}
                </p>
              </div>
            ))
          ) : (
            <p>No investments found.</p>
          )}
        </CardContent>
        <CardFooter>
          <Link href={`/dashboard/${id}/investments/create`}>
            Add New Investment
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InvestmentsPage;

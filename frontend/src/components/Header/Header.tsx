// src/components/Header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Rotas que não devem mostrar o header
  const excludedRoutes = ["/auth/login", "/auth/register"];

  if (excludedRoutes.includes(pathname)) {
    return null;
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-xl font-bold text-gray-800">
            Investment Manager
          </Link>
          <nav className="space-x-4">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Portfolios
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/create"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Button variant="outline">Create New Portfolio</Button>
          </Link>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

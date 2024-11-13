// src/components/Header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Rotas que não devem mostrar o header
  const excludedRoutes = ["/auth/login", "/auth/register"];

  if (excludedRoutes.includes(pathname)) {
    return null;
  }

  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-xl font-bold hover:text-custom-hover transition-colors"
          >
            Investment Manager
          </Link>
          <nav className="space-x-4">
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Portfolios
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* Tema Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

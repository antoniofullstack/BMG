import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/Header/Header";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

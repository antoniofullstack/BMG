'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import './globals.css';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Usuário está logado, redireciona para o dashboard
        router.push('/dashboard');
      } else {
        // Usuário não está logado, redireciona para a página de login
        router.push('/auth/login');
      }
    }
  }, [user, loading, router]);

  return null; // Ou você pode retornar um carregando enquanto a verificação acontece
}

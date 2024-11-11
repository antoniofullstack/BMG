import { Investment } from '@/interfaces/Investment';
import { Portfolio } from '@/interfaces/Portfolio';
import { User } from '@/interfaces/User';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = {
  // Users
  createUser: async (user: User) => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  },
  getUsers: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },
  updateUser: async (id: string, user: User) => {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data;
  },
  deleteUser: async (id: string) => {
    await axios.delete(`${API_URL}/users/${id}`);
  },

  // Authentication
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // Retorna os dados do usuário e o token
  },

  register: async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data; // Retorna os dados do usuário e o token
  },

  logout: async () => {
    // Se você estiver usando um token, você pode apenas limpar o token do armazenamento local
    localStorage.removeItem('token');
    return true; // Retorna true para indicar que o logout foi bem-sucedido
  },

  // Portfolios
  createPortfolio: async (portfolio: Portfolio) => {
    const response = await axios.post(`${API_URL}/portfolios`, portfolio);
    return response.data;
  },
  getPortfolios: async () => {
    const response = await axios.get(`${API_URL}/portfolios`);
    return response.data;
  },
  getPortfolio: async (id: string | string[]) => {
    const response = await axios.get(`${API_URL}/portfolios/${id}`);
    return response.data;
  },
  updatePortfolio: async (id: string, portfolio: Portfolio) => {
    const response = await axios.put(`${API_URL}/portfolios/${id}`, portfolio);
    return response.data;
  },
  deletePortfolio: async (id: string) => {
    await axios.delete(`${API_URL}/portfolios/${id}`);
  },

  // Investments
  createInvestment: async (investment: Investment) => {
    const response = await axios.post(`${API_URL}/investments`, investment);
    return response.data;
  },
  getInvestments: async () => {
    const response = await axios.get(`${API_URL}/investments`);
    return response.data;
  },
  updateInvestment: async (id: string, investment: Investment) => {
    const response = await axios.put(
      `${API_URL}/investments/${id}`,
      investment
    );
    return response.data;
  },
  deleteInvestment: async (id: string) => {
    await axios.delete(`${API_URL}/investments/${id}`);
  },
};

export default api;

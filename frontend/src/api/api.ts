import { Investment } from "@/interfaces/Investment";
import { Portfolio } from "@/interfaces/Portfolio";
import { User } from "@/interfaces/User";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";
const AuthorizationHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const api = {
  // Authentication
  login: async (email: string, password: string) => {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return data;
  },
  register: async (name: string, email: string, password: string) => {
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return data;
  },
  logout: async () => {
    localStorage.removeItem("token");
    return true;
  },
  getProfileFromToken: async (token: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/auth/profile`,
      AuthorizationHeader(token)
    );
    return response.data;
  },

  // User Management
  createUser: async (user: User) => {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
  },
  getUser: async (id: string, token: string) => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  updateUser: async (id: string, user: User) => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, user);
    return response.data;
  },
  deleteUser: async (id: string) => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
  },

  // Portfolio Management
  createPortfolio: async (portfolio: Portfolio, token: string) => {
    const { data } = await axios.post(
      `${API_BASE_URL}/portfolios`,
      portfolio,
      AuthorizationHeader(token)
    );
    return data;
  },
  getPortfolios: async (id: string | undefined, token: string) => {
    const { data } = await axios.get(
      `${API_BASE_URL}/portfolios/${id}`,
      AuthorizationHeader(token)
    );
    return data;
  },
  getPortfolio: async (id: string | string[], token: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/portfolios/${id}`,
      AuthorizationHeader(token)
    );
    return response.data;
  },
  updatePortfolio: async (id: string, portfolio: Portfolio, token: string) => {
    const response = await axios.put(
      `${API_BASE_URL}/portfolios/${id}`,
      portfolio,
      AuthorizationHeader(token)
    );
    return response.data;
  },
  deletePortfolio: async (id: string, token: string) => {
    await axios.delete(
      `${API_BASE_URL}/portfolios/${id}`,
      AuthorizationHeader(token)
    );
  },

  // Investment Management
  createInvestment: async (investment: Investment, token: string) => {
    const response = await axios.post(
      `${API_BASE_URL}/investments`,
      investment,
      AuthorizationHeader(token)
    );
    return response.data;
  },
  getInvestments: async (token: string) => {
    const response = await axios.get(
      `${API_BASE_URL}/investments`,
      AuthorizationHeader(token)
    );
    return response.data;
  },
  updateInvestment: async (
    id: string,
    investment: Investment,
    token: string
  ) => {
    const response = await axios.put(
      `${API_BASE_URL}/investments/${id}`,
      investment,
      AuthorizationHeader(token)
    );
    return response.data;
  },
  deleteInvestment: async (id: string, token: string) => {
    await axios.delete(
      `${API_BASE_URL}/investments/${id}`,
      AuthorizationHeader(token)
    );
  },
};

export default api;

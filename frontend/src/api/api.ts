import { Investment } from '@/interfaces/Investment';
import { Portfolio } from '@/interfaces/Portfolio';
import { User } from '@/interfaces/User';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:5000'; // Mantenha para referência futura

const getMockData = () => {
    const dataPath = path.join(__dirname, '../mock/data.json');
    const rawData = fs.readFileSync(dataPath).toString();
    return JSON.parse(rawData);
};

const api = {
    // Users
    createUser: async (user: User) => {
        const data = getMockData();
        user.id = (data.users.length + 1).toString(); // Simula um novo ID
        data.users.push(user);
        // Aqui você poderia salvar de volta no arquivo, se necessário
        return user;
    },
    getUsers: async () => {
        const data = getMockData();
        return data.users;
    },
    updateUser: async (id: string, user: User) => {
        const data = getMockData();
        const index = data.users.findIndex(u => u.id === id);
        if (index !== -1) {
            data.users[index] = { ...data.users[index], ...user };
            return data.users[index];
        }
        throw new Error('User  not found');
    },
    deleteUser: async (id: string) => {
        const data = getMockData();
        const index = data.users.findIndex(u => u.id === id);
        if (index !== -1) {
            data.users.splice(index, 1);
            return;
        }
        throw new Error('User  not found');
    },

    // Authentication
    login: async (email: string, password: string) => {
        const data = getMockData();
        const user = data.users.find(u => u.email === email && u.password === password);
        if (user) {
            return user;
        }
        throw new Error('User not found');
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
        const data = getMockData();
        portfolio.userId = (data.portfolios.length + 1).toString(); // Simula um novo ID
        data.portfolios.push(portfolio);
        return portfolio;
    },
    getPortfolios: async () => {
        const data = getMockData();
        return data.portfolios;
    },
    updatePortfolio: async (id: string, portfolio: Portfolio) => {
        const data = getMockData();
        const index = data.portfolios.findIndex(p => p.id === id);
        if (index !== -1) {
            data.portfolios[index] = { ...data.portfolios[index], ...portfolio };
            return data.portfolios[index];
        }
        throw new Error('Portfolio not found');
    },
    deletePortfolio: async (id: string) => {
        const data = getMockData();
        const index = data.portfolios.findIndex(p => p.id === id);
        if (index !== -1) {
            data.portfolios.splice(index, 1);
            return;
        }
        throw new Error('Portfolio not found');
    },

    // Investments
    createInvestment: async (investment: Investment) => {
        const data = getMockData();
        investment.portfolioId = (data.investments.length + 1).toString(); // Simula um novo ID
        data.investments.push(investment);
        return investment;
    },
    getInvestments: async () => {
        const data = getMockData();
        return data.investments;
    },
    updateInvestment: async (id: string, investment: Investment) => {
        const data = getMockData();
        const index = data.investments.findIndex(i => i.id === id);
        if (index !== -1) {
            data.investments[index] = { ...data.investments[index], ...investment };
            return data.investments[index];
        }
        throw new Error('Investment not found');
    },
    deleteInvestment: async (id: string) => {
        const data = getMockData();
        const index = data.investments.findIndex(i => i.id === id);
        if (index !== -1) {
            data.investments.splice(index, 1);
            return;
        }
        throw new Error('Investment not found');
    }
};

export default api;
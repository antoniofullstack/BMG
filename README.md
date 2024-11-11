# Aplicação de Gerenciamento de Investimentos

Este projeto é uma aplicação fullstack para gerenciamento de investimentos, permitindo que os usuários criem e gerenciem suas carteiras de investimento e realizem investimentos em diversas empresas.

## Estrutura do Projeto:

O projeto é dividido em duas partes principais:

- **Frontend**: Desenvolvido utilizando Next.js, React e Tailwind CSS.
- **Backend**: Desenvolvido utilizando Nest.js e TypeORM com PostgreSQL como banco de dados.

## Backend

### Tecnologias Utilizadas

- **Nest.js**: Framework para construção de aplicações Node.js escaláveis.
- **TypeORM**: ORM para TypeScript e JavaScript, usado para interagir com o banco de dados.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **JWT**: Para autenticação e autorização dos usuários.

## Configuração do Backend

1. Clone o repositório:

   ```
   git clone <URL_DO_REPOSITORIO>
   cd backend
   ```

2. Instale as dependências:

   ```
   npm install
   ```

3. Configuração do Banco de Dados: Crie um arquivo .env na raiz do diretório backend com as seguintes variáveis:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=sua_senha
   DB_NAME=investment_db
   JWT_SECRET=suaChaveSecretaAquiMuitoSegura
   ```

4. Inicie o servidor:

   ```
   npm run start:dev
   ```

   O backend estará rodando em http://localhost:3000

## Frontend

### Tecnologias Utilizadas

- **Next.js**: Framework React para construção de aplicações web.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **Axios**: Para realizar requisições HTTP.

### Configuração do Frontend

1. Clone o repositório:

   ```
   git clone <URL_DO_REPOSITORIO>
   cd frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
   O frontend estará acessível em http://localhost:3000.

## Como Usar a Aplicação

1. **Registro e Login**:

   - Acesse a página de registro (/auth/register) para criar uma nova conta.
   - Após o registro, faça login na página de login (/auth/login).

2. **Gerenciamento de Carteiras**:

   - Após o login, você será redirecionado para o dashboard onde poderá visualizar suas carteiras.
   - Você pode criar, visualizar, editar e excluir carteiras de investimento.

3. **Gerenciamento de Investimentos**:
   - Dentro de cada carteira, você pode adicionar investimentos em empresas, visualizar detalhes e editar ou excluir investimentos.

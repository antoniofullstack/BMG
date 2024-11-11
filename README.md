# Aplicação de Gerenciamento de Investimentos

Este projeto é uma aplicação fullstack para gerenciamento de investimentos, permitindo que os usuários criem e gerenciem suas carteiras de investimento e realizem investimentos em diversas empresas.

## Sumário

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração do Ambiente com Docker](#configuração-do-ambiente-com-docker)
- [Como Usar a Aplicação](#como-usar-a-aplicação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Execução de Testes](#execução-de-testes)
- [Decisões de Projeto](#decisões-de-projeto)
- [Documentação da API](#documentação-da-api)

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

- **Frontend**: Desenvolvido utilizando Next.js, React e Tailwind CSS.
- **Backend**: Desenvolvido utilizando Nest.js e TypeORM com PostgreSQL como banco de dados.

## Tecnologias Utilizadas

### Backend

- **Nest.js**: Framework para construção de aplicações Node.js escaláveis.
- **TypeORM**: ORM para TypeScript e JavaScript, usado para interagir com o banco de dados.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **JWT**: Para autenticação e autorização dos usuários.

### Frontend

- **Next.js**: Framework React para construção de aplicações web.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **Axios**: Para realizar requisições HTTP.

## Configuração do Ambiente com Docker

### Requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

### Iniciando o Projeto

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_DIRETORIO>
   ```

2. Crie um arquivo .env na raiz do diretório com as seguintes variáveis:
   ```
   DB_USER=postgres
   DB_PASS=sua_senha
   DB_NAME=investment_db
   JWT_SECRET=suaChaveSecretaAquiMuitoSegura
   ```
3. Inicie os serviços usando Docker Compose:

```
docker-compose up --build
```

O backend estará rodando em http://localhost:3001 e o frontend em http://localhost:3000.

## Como Usar a Aplicação

1. **Registro e Login**:
   - Acesse a página de registro (/auth/register) para criar uma nova conta.
   - Após o registro, faça login na página de login (/auth/login).
2. **Gerenciamento de Carteiras**:
   - Após o login, você será redirecionado para o dashboard onde poderá visualizar suas carteiras.
   - Você pode criar, visualizar, editar e excluir carteiras de investimento.
3. **Gerenciamento de Investimentos**:
   - Dentro de cada carteira, você pode adicionar investimentos em empresas, visualizar detalhes e editar ou excluir investimentos.

## Variáveis de Ambiente

```
DB_USER=postgres
DB_PASS=sua_senha
DB_NAME=investment_db
JWT_SECRET=suaChaveSecretaAquiMuitoSegura
```

Essas variáveis são usadas para configurar a conexão com o banco de dados e a autenticação JWT.

## Execução de Testes

Para garantir a qualidade do código e a funcionalidade da aplicação, foram implementados testes automatizados. Para executar os testes, siga as instruções abaixo:

1. Certifique-se de que as dependências de desenvolvimento estejam instaladas:

   ```
   npm install
   ```

2. Execute os testes com o seguinte comando:

   ```
   npm test
   ```

Os resultados dos testes serão exibidos no terminal.

## Decisões de Projeto

Durante o desenvolvimento da aplicação, algumas decisões de projeto foram tomadas para garantir a escalabilidade e a manutenção do código:

- Uso de Nest.js no Backend: Escolhido por sua arquitetura modular e suporte a TypeScript, o que facilita a construção de aplicações escaláveis e de fácil manutenção.
- Uso de Next.js no Frontend: Escolhido por suas funcionalidades de renderização do lado do servidor (SSR) e geração de sites estáticos (SSG), além de ser uma extensão poderosa do React.
- TypeORM: Utilizado para interagir com o banco de dados PostgreSQL de maneira eficiente e tipada.
- Autenticação com JWT: Implementado para garantir a segurança na autenticação e autorização dos usuários.

## Documentação da API

A API do backend foi documentada utilizando Swagger, facilitando a visualização e o teste das rotas disponíveis. Para acessar a documentação da API, siga os passos abaixo:

1. Certifique-se de que o backend está em execução.
2. Acesse a documentação da API no seguinte URL:

```
http://localhost:3001/api-docs
```

Nessa documentação, você encontrará detalhes sobre as rotas disponíveis, os parâmetros esperados, e os exemplos de respostas.

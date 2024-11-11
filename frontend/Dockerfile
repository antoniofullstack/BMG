# Usar a imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Compilar o aplicativo (se necessário)
RUN npm run build

# Expor a porta que o app vai rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
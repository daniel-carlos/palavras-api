# Use uma imagem Node.js oficial como base
FROM node:22

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Copiar o arquivo .env para o contêiner
#COPY .env .env

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Exponha a porta que o NestJS irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]

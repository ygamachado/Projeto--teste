# Usando Node.js 20 como base
FROM node:20

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Executa os testes durante o build (se falhar, o build para)
#RUN npm test

# Expõe a porta 3000
EXPOSE 3000

# Comando padrão para desenvolvimento
CMD ["npm", "run", "start"]

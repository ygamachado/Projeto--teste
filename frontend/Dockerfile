# Usando Node.js 20 como base
FROM node:20

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala as dependências de forma explícita
RUN npm install --legacy-peer-deps

# Copia o restante do código para o container
COPY . .

# Certifique-se de que node_modules e binários estejam presentes
RUN ls -la node_modules/.bin

# Evita erro do react-scripts não encontrado
ENV PATH /app/node_modules/.bin:$PATH

# Expõe a porta 3000
EXPOSE 3000

# Garante que as dependências estejam sempre instaladas
CMD ["npm", "start"]


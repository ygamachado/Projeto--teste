# Usa uma imagem base com Python
FROM python:3.9-slim

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Define a variável de ambiente para o Django
ENV DJANGO_SETTINGS_MODULE=gps_poi.settings

# Copia o arquivo de dependências para o contêiner
COPY requirements.txt /app/

# Instala as dependências do Django
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código para o contêiner
COPY . /app/

# Expõe a porta do Django (geralmente 8000)
EXPOSE 8000

# Comando para rodar as migrações e depois iniciar o servidor Django
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000"]

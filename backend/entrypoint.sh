#!/bin/bash

# Rodar as migrações
echo "Rodando migrações..."
python manage.py migrate --noinput

# Iniciar o servidor Django
echo "Iniciando o servidor Django..."
python manage.py runserver 0.0.0.0:8000

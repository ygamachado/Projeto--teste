from django.shortcuts import render

# Create your views here.
# poi/views.py

# pois/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import POI
from .serializers import POISerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import POI
from .serializers import POISerializer
import math

# Cadastro de POI
@api_view(['POST'])
def cadastrar_poi(request):
    if request.method == 'POST':
        serializer = POISerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Listagem de POI
@api_view(['GET'])
def listar_poi(request):
    poi = POI.objects.all()
    serializer = POISerializer(poi, many=True)
    return Response(serializer.data)

# Busca por proximidade
@api_view(['GET'])
def buscar_poi_por_proximidade(request):
    x = float(request.GET.get('coordenada_x', 0))
    y = float(request.GET.get('coordenada_y', 0))
    d_max = float(request.GET.get('distancia_maxima', 0))

    poi = POI.objects.all()
    poi_proximos = []

    for poi in poi:
        distancia = math.sqrt((poi.coordenada_x - x)**2 + (poi.coordenada_y - y)**2)
        if distancia <= d_max:
            poi_proximos.append(poi)

    serializer = POISerializer(poi_proximos, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_location(request):
    if request.method == 'POST':
        serializer = POISerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

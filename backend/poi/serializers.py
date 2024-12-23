# poi/serializers.py


from rest_framework import serializers
from .models import POI

class POISerializer(serializers.ModelSerializer):
    class Meta:
        model = POI
        fields = ['id', 'nome', 'coordenada_x', 'coordenada_y']


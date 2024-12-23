from django.test import TestCase

# Create your tests here.
# pois/tests.py
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import POI

class POITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.poi_data = {'nome': 'Lanchonete', 'coordenada_x': 27, 'coordenada_y': 12}
        self.poi = POI.objects.create(**self.poi_data)

    def test_cadastrar_poi(self):
        response = self.client.post('/api/poi/cadastrar/', self.poi_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_listar_poi(self):
        response = self.client.get('/api/poi/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_buscar_poi_por_proximidade(self):
        response = self.client.get('/api/poi/buscar/20/10/10/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

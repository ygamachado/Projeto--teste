# poi/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('poi/', views.listar_poi),
    path('poi/cadastrar/', views.cadastrar_poi),
    path('poi/buscar/', views.buscar_poi_por_proximidade),
    path('locations/', views.create_location, name='create_location'),
]

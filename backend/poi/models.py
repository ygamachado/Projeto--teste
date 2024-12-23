from django.db import models

# Create your models here.

# poi/models.py

from django.db import models

class POI(models.Model):
    nome = models.CharField(max_length=100)
    coordenada_x = models.IntegerField()
    coordenada_y = models.IntegerField()

    def __str__(self):
        return self.nome

from django.contrib import admin

# Register your models here.
# poi/admin.py

from django.contrib import admin
from .models import POI

admin.site.register(POI)

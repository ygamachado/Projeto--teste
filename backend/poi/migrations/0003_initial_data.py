from django.db import migrations

def insert_initial_data(apps, schema_editor):
    POI = apps.get_model('poi', 'POI')
    POI.objects.bulk_create([
        POI(nome='Lanchonete', coordenada_x=27, coordenada_y=12),
        POI(nome='Posto', coordenada_x=31, coordenada_y=18),
        POI(nome='Joalheria', coordenada_x=15, coordenada_y=12),
        POI(nome='Floricultura', coordenada_x=19, coordenada_y=21),
        POI(nome='Pub', coordenada_x=12, coordenada_y=8),
        POI(nome='Supermercado', coordenada_x=23, coordenada_y=6),
        POI(nome='Churrascaria', coordenada_x=28, coordenada_y=2),
    ])

class Migration(migrations.Migration):

    dependencies = [
        ('poi', '0002_remove_poi_descricao_remove_poi_latitude_and_more'),
    ]

    operations = [
        migrations.RunPython(insert_initial_data),
    ]

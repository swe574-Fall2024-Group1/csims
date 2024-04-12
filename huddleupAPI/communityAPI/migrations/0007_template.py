# Generated by Django 3.2.4 on 2024-04-12 12:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authAPI', '0002_session'),
        ('communityAPI', '0006_rename_createdate_communityuserconnection_createdat'),
    ]

    operations = [
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('templateName', models.CharField(max_length=50)),
                ('rows', models.JSONField(default=list)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('community', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='communityAPI.community')),
                ('createdBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authAPI.user')),
            ],
        ),
    ]

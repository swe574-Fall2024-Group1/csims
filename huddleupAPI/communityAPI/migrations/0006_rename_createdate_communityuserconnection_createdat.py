# Generated by Django 3.2.4 on 2024-04-11 11:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('communityAPI', '0005_alter_communityuserconnection_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='communityuserconnection',
            old_name='createDate',
            new_name='createdAt',
        ),
    ]

# Generated by Django 4.2.7 on 2024-01-03 10:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0014_remove_crawling_like_crawling_like_count_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='like_posts',
        ),
        migrations.DeleteModel(
            name='Crawling',
        ),
    ]
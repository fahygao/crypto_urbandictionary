# Generated by Django 5.1.4 on 2025-03-02 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("words", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="definition",
            name="downvotes",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="definition",
            name="example",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="definition",
            name="upvotes",
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="definition",
            name="definition",
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name="definition",
            name="pub_date",
            field=models.DateTimeField(
                auto_now_add=True, verbose_name="date published"
            ),
        ),
        migrations.AlterField(
            model_name="definition",
            name="word",
            field=models.CharField(max_length=200),
        ),
    ]

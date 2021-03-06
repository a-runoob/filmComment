# Generated by Django 2.1.4 on 2019-01-04 11:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Filmapp', '0013_comment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='id',
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Filmapp.Profile'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='nickName',
            field=models.CharField(help_text='用户名', max_length=50, primary_key=True, serialize=False),
        ),
    ]

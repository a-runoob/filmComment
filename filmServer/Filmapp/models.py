from django.db import models

# Create your models here.


class Movie(models.Model):
    filmName = models.CharField(max_length=50, help_text="电影名字")
    filmIcon = models.ImageField(upload_to="film_icon", null=True)
    # score = models.FloatField(max_digits=2, decimal_places=1)
    score = models.CharField(max_length=50)
    actor = models.CharField(max_length=100, null=True)
    filmTime = models.CharField(max_length=50, help_text="上映时间")
    brief = models.TextField(max_length=1000, help_text="简介")
    # comment = models.TextField(max_length=2000, null=True)
    like = models.BooleanField(null=True)

    def __str__(self):
        return self.filmName


class Profile (models.Model):
    nickName = models.CharField(max_length=50, help_text="用户名", primary_key=True)
    nickIcon = models.ImageField(upload_to="film_icon", null=True)

    def __str__(self):
        return self.nickName


class Collect (models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE,null=True)
    filmName = models.CharField(max_length=50, help_text="电影名字",null=True)
    filmIcon = models.ImageField(upload_to="film_icon", null=True)
    score = models.CharField(max_length=50)

    def __str__(self):
        return self.filmName
class Comment(models.Model):
    film = models.ForeignKey(Movie,on_delete=models.CASCADE,null=True)
    user = models.ForeignKey(Profile,on_delete=models.CASCADE,null=True)
    filmName = models.CharField(max_length=100,null=True)
    comment = models.TextField(max_length=2000,null=True)
    def __str__(self):
        return self.filmName
from django.contrib import admin
from .models import *

# Register your models here.


class MovieAdmin(admin.ModelAdmin):
    list_display = ('filmName', )


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('nickName','nickIcon')


class CollectAdmin(admin.ModelAdmin):
    list_display = ('filmName','user')


class CommentAdmin(admin.ModelAdmin):
    list_display = ('comment','film','user')


admin.site.register(Movie, MovieAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Collect, CollectAdmin)
admin.site.register(Comment, CommentAdmin)

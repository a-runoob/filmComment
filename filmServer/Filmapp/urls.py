from django.urls import path
from . import views
urlpatterns=[
    path("movie", views.movieList),
    path("profile", views.addUser),
    path("collect",views.addCollect),
    path("collectList",views.collectList),
    path("updatefilm",views.updateMoive),
    path("dislike",views.dislike),
    path("discollect",views.discollect),
    path("addcomment",views.addcomment),
    path("commentlist",views.commentList),
    path("mycommentslist",views.mycommentList),
    path("searchmovie",views.searchList),
    path("import",views.import_data),

]
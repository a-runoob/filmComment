import json
from django.shortcuts import render

from django.http import JsonResponse
from .models import *
# Create your views here.
def movieList(request):
    mList = Movie.objects.all()
    print(mList)
    data = []
    media_url = "http://127.0.0.1:8000"
    for m in mList:
        data.append({
            'filmName': m.filmName,
            'filmIcon': media_url+m.filmIcon.url,
            'score': m.score,
            'actor': m.actor,
            'filmTime': m.filmTime,
            'brief': m.brief,
            # 'comment': m.comment,
            'like' : m.like,
            'id': m.id
        })
    return JsonResponse({'movies': data, 'msg': 'ok'})
def searchList(request):
    input = request.GET.get("input")
    if input != '':
        sList = Movie.objects.filter(filmName=input)
        msg = '搜索成功'
        print(sList)
        data = []
        media_url = "http://127.0.0.1:8000"
        for m in sList:
            data.append({
                'filmName': m.filmName,
                'filmIcon': media_url + m.filmIcon.url,
                'score': m.score,
                'actor': m.actor,
                'filmTime': m.filmTime,
                'brief': m.brief,
                # 'comment': m.comment,
                'like': m.like,
                'id': m.id
            })

    return JsonResponse({'movies': data, 'msg': msg})
def addUser(request):
    nickName = request.GET.get("nickName")
    nickIcon = request.GET.get("nickIcon")
    if not Profile.objects.filter(nickName=nickName):
        Profile.objects.create(nickName=nickName, nickIcon=nickIcon)
        msg = '用户添加成功！'
    else:
        msg = '用户已存在！'
    return JsonResponse({'msg':msg})
def addCollect(request):
    filmName = request.GET.get("filmName")
    filmIcon = request.GET.get("filmIcon")
    nickName = request.GET.get("nickName")
    # id = request.GET.get("id")
    score = request.GET.get("score")
    yonghu = Profile.objects.filter(nickName=nickName)
    print(yonghu[0])
    if not Collect.objects.filter(filmName= filmName):
        Collect.objects.create(filmName=filmName,user=yonghu[0],filmIcon=filmIcon,score=score)
        msg = '收藏成功！'
    else:
        msg = '不能重复收藏！'
    return JsonResponse({'msg':msg})

def updateMoive(request):
    like = request.GET.get("like")
    filmName = request.GET.get("filmName")
    # id = request.GET.get("id")
    Movie.objects.filter(filmName=filmName).update(like=like)
    msg = '收藏成功！'
    return JsonResponse({'msg':msg})
def dislike(request):
    like = request.GET.get("like")
    # id = request.GET.get("id")
    filmName = request.GET.get("filmName")
    Movie.objects.filter(filmName=filmName).update(like=like)
    return JsonResponse({'msg':'取消收藏成功......'})

def discollect(request):
    filmName = request.GET.get("filmName")
    Collect.objects.filter(filmName=filmName).delete()
    return JsonResponse({'msg':'删除收藏成功....'})
def collectList(request):
    cList = Movie.objects.filter(like="True")
    print(cList)
    data = []
    media_url = 'http://127.0.0.1:8000'
    for c in cList:
        data.append({
            'filmName': c.filmName,
            'filmIcon':media_url + c.filmIcon.url,
            'score': c.score,
            'id':c.id
        })
    return JsonResponse({'collects': data,'msg':'ok'})

def addcomment(request):
    filmName=request.GET.get("filmName")
    id = request.GET.get("id")
    nickName = request.GET.get("nickName")
    yonghu = Profile.objects.filter(nickName=nickName)
    movie=Movie.objects.filter(id=id)
    #  movie[0]代表queryList的第一个
    print(movie[0].filmName)
    print(yonghu[0].nickName)
    comment = request.GET.get("comment")
    Comment.objects.create(film=movie[0],user=yonghu[0],filmName=filmName, comment=comment)
    return JsonResponse({'msg':'评论成功'})

def commentList(request):
    filmName = request.GET.get("filmName")
    print(filmName)
    cList = Comment.objects.all().filter(filmName=filmName)
    print(cList)
    data = []
    for c in cList:
        data.append({
            'comment':c.comment,
            'user':c.user.nickName
        })
    print(data)
    return JsonResponse({'comments':data,'msg':'ok'})

def mycommentList(request):
    nickName = request.GET.get("nickName")
    print(nickName)
    mList = Comment.objects.all().filter(user=nickName)
    print(mList)
    data = []
    for m in mList:
        data.append({
            'filmName':m.filmName,
            'comment':m.comment,
            'user':m.user.nickName
        })
    print(data)
    return JsonResponse({'mycomments':data,'msg':'ok'})

def import_data(request) :
    with open("Filmapp/movie.txt", encoding='utf8') as f:
        cnt = 1
        for line in f:
            print(cnt, len(line.split('****')))
            filmName, filmIcon, score, actor, filmTime, brief, like = line.split("****")

            Movie.objects.create(filmName=filmName, filmIcon=filmIcon, score=score, actor=actor, filmTime=filmTime,
                                 brief=brief, like=like.strip())

            cnt += 1
    return JsonResponse({'msg':'ok'})

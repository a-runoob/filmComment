const app=getApp();
Page({
  comments:null,
  movies:[],
  data:{

  },
  onLoad:function(options){
    var tranfilmName,id;
    // console.log(options.id);
    try{
      tranfilmName = options.tranfilmName;
      id = options.id;
      this.setData({
        id: parseInt(id) + 1,
        tranfilmName: tranfilmName
        // filmName:this.movies[0].filmName
      })
    }catch(err){
      // continue;
    }
    
    

    // console.log('::::'+this.movies[0].filmName);
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/movies/movie',
      data: {
      
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('成功' + res)
        if (res.errMsg == "request:ok") {
          for (var i = 0; i < res.data.movies.length; i++) {
            try {
              if(res.data.movies[i].id==id||res.data.movies[i].filmName==that.data.tranfilmName){
                that.movies.push({
                  filmName: res.data.movies[i].filmName,
                  filmIcon: res.data.movies[i].filmIcon,
                  score: res.data.movies[i].score,
                  actor: res.data.movies[i].actor,
                  filmTime: res.data.movies[i].filmTime,
                  brief: res.data.movies[i].brief,
                  // comment: res.data.movies[i].comment,
                  // index:i,
                  like:res.data.movies[i].like
                });
              }
              // else if (res.data.movies[i]==tFilmName){
                 
              // }

            } catch (err) {
              continue;
            }
          }
          that.setData(that.movies[0]);
          that.setData({
            filmName:that.movies[0].filmName
          });
          // console.log('图片url' + that.movies[0].filmIcon);
          var self=that;
          console.log('电影名:' + that.data.filmName);
          // 所有评论  
          wx.request({
            url: 'http://127.0.0.1:8000/movies/commentlist',
            data: {
              filmName:that.data.filmName
            },
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              console.log(res)
              if (res.errMsg == 'request:ok') {
                // console.log(res.data.comments[0].comment)
                self.setData({
                  comments: res.data.comments
                })
              }
            }
          })
        }
      },
      fail: function (e) {
        console.log(e);
      },
      complete: function (e) {
        console.log(e);
      }
    })
    wx.setNavigationBarTitle({
      title: '电影介绍',
    })





  },
  // onShow:function(){
  //   this.onLoad();
  // },
  //收藏   添加收藏
  bindFilmLike:function(){
    console.log(this.movies[0].filmName+'已被收藏')
    wx.request({
      url: 'http://127.0.0.1:8000/movies/collect',
      data:{
        filmName:this.movies[0].filmName,
        filmIcon:this.movies[0].filmIcon,
        score:this.movies[0].score,
        // id:this.data.id,
        nickName:app.globalData.userInfo.nickName
      },
      header:{
        'content-type':'application/json'
      },
      success(res) {
        console.log(res)
        if (res.errMsg == "request:ok") {
          console.log(res.data.msg)
        }
      }

    });
    //修改更新 like
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/movies/updatefilm',
      data: {
        filmName: this.data.filmName,
        id:this.data.id,
        like:'True'
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('更新成功'+res)
        if (res.errMsg == "request:ok") {
          console.log(res.data.msg);
          that.setData({
            like:true
          })
        }

      },
      fail: function (e) {
        console.log(e);
      },
      complete: function (e) {
        console.log(e);
      }
    });
    wx.showToast({
      icon:'success',
      title: '已收藏',
      duration:1000
    });
    // wx.reLaunch({
    //   url: '../comment/comment',
    // });
  },
  //取消收藏   删除collect列表
  bindFilmDislike:function(){
    //
    wx.request({
      url: 'http://127.0.0.1:8000/movies/discollect',
      data:{
        filmName:this.data.filmName
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log('删除收藏'+res);
        if(res.errMsg=='request:ok'){
          console.log(res.data.msg);

        }
      }
    })

    //修改是否喜欢
     var that=this;
     wx.request({
       url: 'http://127.0.0.1:8000/movies/dislike',
       data:{
         id:this.data.id,
         filmName: this.data.filmName,
         like:'False'
       },
       header:{
         'content-type':'application/json'
       },
       success(res){
         console.log('取消收藏'+res);
         if(res.errMsg=='request:ok'){
           console.log(res.data.msg);
           that.setData({
             like:false
           })
         }
         wx.showToast({
           title: '已取消收藏',
           icon:'success',
           duration:1000
         })

       },
       fail: function (e) {
         console.log(e);
       },
       complete: function (e) {
         console.log(e);
       }
     });
    //  wx.reLaunch({
    //    url: '../comment/comment',
    //  });

  },
  //提交影评
  bindSubmit:function(e){
      // console.log('全局变量：'+app.globalData.userInfo.nickName);
      console.log(e.detail.value.textarea);
    if (e.detail.value.textarea==''){
      wx.showToast({
        title: '评论不能为空',
        icon:'none',
        duration:1000
      })
    }else{
      wx.request({
        url: 'http://127.0.0.1:8000/movies/addcomment',
        data: {
          filmName: this.data.filmName,
          comment: e.detail.value.textarea,
          id: this.data.id,
          nickName: app.globalData.userInfo.nickName
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {

          // console.log(e.detail.value.textarea);
          if (res.errMsg == "request:ok") {
            console.log(res.data.msg);
          }
          wx.showToast({
            title: '评论成功',
            icon: 'success',
            duration: 1000
          });
          //评论后刷新 当前页面
          if(getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }
        }
      })
    }

  },

 //字数限制
 bindinput:function(e){
    var len=parseInt(e.detail.value.length);

    if(len>=300){
        wx.showToast({
          title: '字数不能超过限定值',
          icon: 'none',
          duration: 1000
        });
    }
    this.setData({
      currentlen:len
    })
 }, 
  onShareAppMessage: function () {

  }
})

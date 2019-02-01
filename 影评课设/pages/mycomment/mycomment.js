const app=getApp();

Page({
  // mycomments:null,
  data:{

  },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '我的评论',
    })
  },
  onShow:function(){
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8000/movies/mycommentslist',
      data:{
        nickName:app.globalData.userInfo.nickName
      },
      header:{'content-type':'application/json'},
      success(res){
        console.log(res);
        if(res.errMsg=='request:ok'){
           that.setData({
             mycomments:res.data.mycomments
           })
          
           if(res.data.mycomments.length==0){
             that.setData({
               mycommentLength:true
             }) 
           }
          if (res.data.mycomments.length > 0){
            console.log(res.data.mycomments.length)
            that.setData({
              mycommentLength:false
            })
          }
        }
        // console.log('我的评论：'+that.data.mycomments[0].comment);
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1000
    });
    if (getCurrentPages().length != 0) {
      getCurrentPages()[getCurrentPages().length - 1].onLoad();
    }
  },
  onShareAppMessage: function () {

  },
})
//index.js
//获取应用实例
const app = getApp()

Page({
  //电影列表
  movies:null,
  data: {
    loading:true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad:function(){
    //单个 数组的一条数据  渲染时只需其属性
    // this.setData(this.movies[0]);
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8000/movies/movie',
      data:{
      },
      header:{
        'content-type': 'application/json'
      },
      success(res) {
        console.log('成功'+res)
        if (res.errMsg == "request:ok") {
          //贪心算法   排序
          res.data.movies.sort(  
          function(x,y){
          return y.score - x.score; 
        });


              that.setData({
                movies: res.data.movies
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
    setTimeout(function(){
      that.setData({
        loading: false,
        
      });
    },1000);
    console.log('onload');
  },

  //搜索电影
  bindSubmit:function(e){
    console.log('搜索电影:'+e.detail.value.input);
    wx.navigateTo({
      url: '../search/search?input=' + e.detail.value.input,
    })
  },
  onReady:function(){
    // wx.showToast({
    //   title: '加载完毕',
    //   icon: "success",  //loading none
    //   duration: 1000
    // });
    console.log('ready')
  },


  //进入评论界面
  bindtapcomment:function(e){
    var filmIndex = parseInt(e.currentTarget.dataset.index);
    // var filmMseg = this.movies[filmIndex];
    // console.log('index:'+e.currentTarget.dataset.index);
    // console.log(this.movies[0].filmName);
    for(var i=0;i<this.data.movies.length;i++){
      console.log('电影:' + this.data.movies[i].id);
    }
    
    wx.navigateTo({
      url: '../comment/comment?id='+this.data.movies[filmIndex].id,
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
 onPullDownRefresh:function(){

   wx.showNavigationBarLoading();
   setTimeout(function(){
     // 隐藏导航栏加载框
     wx.hideNavigationBarLoading();
     // 停止下拉动作
     wx.stopPullDownRefresh();
     wx.showToast({
       title:'刷新成功',
       icon: "success",  //loading none
       duration: 1500
     });
   },1000);
 },
  onShareAppMessage: function () {

  }
})

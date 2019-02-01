//index.js
//获取应用实例
const app = getApp()

Page({
  //电影列表
  movies: null,
  data: {
  },

  onLoad: function (options) {
    var input=options.input;
    // console.log('搜索到:'+input);
    var that = this;
    if(input !=''){
      wx.request({
        url: 'http://127.0.0.1:8000/movies/searchmovie',
        data: {
          input: input
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log('成功' + res)
          if (res.data.movies.length==0){
            that.setData({
              msg:'搜索无结果'
            })
          }
          if (res.errMsg == "request:ok") {
            console.log(res.data.msg);
            var arr=[];
            for (var i = 0; i < res.data.movies.length; i++){
                arr.push(res.data.movies[i].id);
            }
            console.log(arr);
            for (var i = 0; i < res.data.movies.length; i++) {

              if(res.data.movies[i].filmName==input){
                var indexId=res.data.movies[i].id;
              }

            }
            //调用二分
            
            var filmIndex=that.binarySearch(arr,indexId);
            console.log('搜索电影的index：'+filmIndex);
            for (var i = 0; i < res.data.movies.length; i++) {
              try {
                that.setData({
                  movies: res.data.movies,
                })
              } catch (err) {
                continue;
              }
            }
          }
        },
        fail: function (e) {
          console.log(e);
        },
        complete: function (e) {
          console.log(e);
        }
      });

    }
    else {
      this.setData({
        msg: '搜索无结果'
      })
    }
  },

  //二分搜索   分治
  binarySearch:function(arr,key){
    var low = 0;
    var high = arr.length - 1;
    while (low <= high) {
      var mid = parseInt((low + high) / 2);
      if (key === arr[mid]) {
        return mid;
      }
      else if (key < arr[mid]) {
        high = mid - 1;
      }
      else if (key > arr[mid]) {
        low = mid + 1;
      }
      else {
        return -1;
      }
    }
  },
  //跳到 评论页面
  bindtapfilmmesg: function (e) {
    var filmIndex = e.currentTarget.dataset.index;
    console.log('index:' + this.data.movies[filmIndex].id);
    wx.navigateTo({
      url: '../comment/comment?tranfilmName=' + this.data.movies[filmIndex].filmName + '&id=' + (this.data.movies[filmIndex].id),
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPullDownRefresh: function () {

    wx.showNavigationBarLoading();
    setTimeout(function () {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon: "success",  //loading none
        duration: 1500
      });
    }, 1000);
  },
  onShareAppMessage: function () {

  }
})

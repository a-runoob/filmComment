
Page({
  collects:null,
  data:{

  },
  onLoad:function(options){
    // this.setData({
    //   collects: this.collects
    // })
    
  },
  onShow:function(){   
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8000/movies/collectList',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        if (res.errMsg == "request:ok") {
          that.setData({
            //字典直接赋值给  collects
            collects: res.data.collects
          })
          // console.log('id'+that.data.collects[0].id);
          //判断是否收藏有电影
          if (res.data.collects.length == 0) {
            that.setData({
              filmLength: false
            })
          } else {
            that.setData({
              filmLength: true
            })
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
    wx.setNavigationBarTitle({
      title: '我的收藏',
    });  
  },

  onReady:function(){
    // this.setData({
    //   collects: this.collects
    // })
  },
  bindtapfilmmesg:function(e){
    var filmIndex = e.currentTarget.dataset.index;
    console.log('index:' + this.data.collects[filmIndex].id);
    wx.navigateTo({
      url: '../comment/comment?tranfilmName=' + this.data.collects[filmIndex].filmName+'&id=' + (this.data.collects[filmIndex].id),
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

  }
})